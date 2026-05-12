-- Esquema de base de datos para Motor de Ingresos
-- Veterinaria PWA

-- 1. Tabla de Productos (Inventario)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('MEDICAMENTO', 'ALIMENTO', 'ACCESORIO', 'SERVICIO')),
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INTEGER NOT NULL DEFAULT 0,
  reorder_point INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabla de Ventas (Cabecera)
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES owners(id),
  seller_id UUID REFERENCES auth.users(id),
  total DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0.00,
  payment_method TEXT CHECK (payment_method IN ('EFECTIVO', 'TARJETA', 'TRANSFERENCIA')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabla de Items de Venta (Detalle)
CREATE TABLE sales_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- 4. Función de Descuento de Stock Automático
CREATE OR REPLACE FUNCTION update_stock_after_sale()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET stock = stock - NEW.quantity,
      updated_at = now()
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para ejecutar la función al insertar en sales_items
CREATE TRIGGER tr_update_stock_after_sale
AFTER INSERT ON sales_items
FOR EACH ROW
EXECUTE FUNCTION update_stock_after_sale();

-- 5. Row Level Security (RLS) Examples
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Solo Admin puede editar productos
CREATE POLICY "Admins can manage products" ON products
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'ADMIN'));

-- Recepción y Admin pueden ver productos y crear ventas
CREATE POLICY "Staff can view products" ON products
  FOR SELECT TO authenticated
  USING (TRUE);

CREATE POLICY "Reception and Admin can create sales" ON sales
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM user_profiles WHERE role IN ('ADMIN', 'RECEPTION')));
