/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote,
  Receipt,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductCategory } from '../../types';

// Mock Products
const mockProducts: Product[] = [
  { id: '1', name: 'Consulta General', category: ProductCategory.SERVICIO, price: 450, stock: 999, reorder_point: 0 },
  { id: '2', name: 'Vacuna Puppy', category: ProductCategory.MEDICAMENTO, price: 320, stock: 15, reorder_point: 5 },
  { id: '3', name: 'Alimento Royal Canin (2kg)', category: ProductCategory.ALIMENTO, price: 850, stock: 8, reorder_point: 3 },
  { id: '4', name: 'Desparasitación', category: ProductCategory.SERVICIO, price: 150, stock: 999, reorder_point: 0 },
  { id: '5', name: 'Collar Isabelino L', category: ProductCategory.ACCESORIO, price: 180, stock: 4, reorder_point: 2 },
];

interface CartItem extends Product {
  quantity: number;
}

export const POSView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(current => current.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    // Simulación de guardado en la tabla 'sales' y actualización de stock en 'products'
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setCart([]);
    alert('Venta realizada con éxito. Actualizando inventario...');
  };

  return (
    <div className="flex gap-8 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8B5A2] group-focus-within:text-[#4A5D4E]" size={20} />
          <input 
            type="text" 
            placeholder="Buscar producto o servicio (F2)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#F0EFEA] rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]/10 focus:border-[#4A5D4E] shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 no-scrollbar">
          {filteredProducts.map(product => (
            <motion.button
              whileHover={{ y: -4 }}
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-5 rounded-3xl border border-[#F0EFEA] flex flex-col items-start text-left hover:shadow-lg transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${
                product.category === ProductCategory.SERVICIO ? 'bg-[#EAF5F7] text-[#3A7E8F]' : 'bg-[#FBF5ED] text-[#9C763A]'
              }`}>
                {product.category === ProductCategory.SERVICIO ? <Stethoscope size={20} /> : <Package size={20} />}
              </div>
              <span className="text-[10px] font-bold text-[#A8B5A2] uppercase tracking-widest">{product.category}</span>
              <h4 className="font-bold text-[#2D3436] mt-1 group-hover:text-[#4A5D4E]">{product.name}</h4>
              <div className="flex justify-between items-end w-full mt-4">
                <span className="text-lg font-bold text-[#4A5D4E]">${product.price}</span>
                <span className={`text-[10px] font-bold ${product.stock < 5 ? 'text-rose-500' : 'text-[#7F8C8D]'}`}>
                  Stock: {product.stock}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart / Checkout */}
      <aside className="w-96 bg-white rounded-[40px] shadow-2xl border border-[#F0EFEA] flex flex-col overflow-hidden">
        <div className="p-6 border-b border-[#F0EFEA] flex items-center gap-3 bg-[#FDFCF8]">
          <div className="w-10 h-10 bg-[#4A5D4E] rounded-2xl flex items-center justify-center text-white">
            <ShoppingCart size={20} />
          </div>
          <h3 className="font-bold text-[#4A5D4E]">Carrito de Venta</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F9F9F7] transition-colors group"
              >
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-[#2D3436]">{item.name}</h5>
                  <p className="text-xs text-[#7F8C8D] font-medium tracking-wide mt-0.5">${item.price} c/u</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-[#F0EFEA] rounded-xl p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-[#7F8C8D] hover:text-[#4A5D4E] hover:bg-[#F9F9F7] rounded-md transition-all"><Minus size={14} /></button>
                  <span className="text-xs font-bold text-[#2D3436] min-w-[20px] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-[#7F8C8D] hover:text-[#4A5D4E] hover:bg-[#F9F9F7] rounded-md transition-all"><Plus size={14} /></button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-rose-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
              <ShoppingCart size={48} className="mb-4 text-[#A8B5A2]" />
              <p className="text-sm font-bold uppercase tracking-widest text-[#7F8C8D]">El carrito está vacío</p>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-[#F0EFEA] bg-[#FDFCF8] space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#7F8C8D] font-medium">Subtotal</span>
              <span className="text-[#2D3436] font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7F8C8D] font-medium">IVA (16%)</span>
              <span className="text-[#2D3436] font-bold">${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-end pt-4 border-t border-dashed border-[#C5D1C7]">
            <span className="text-xs font-bold text-[#4A5D4E] uppercase tracking-[0.2em]">Total Pagar</span>
            <span className="text-3xl font-black text-[#4A5D4E]">${total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="flex items-center justify-center gap-2 py-3 border border-[#F0EFEA] rounded-2xl text-xs font-bold text-[#4A5D4E] hover:bg-white transition-all uppercase tracking-widest">
              <Banknote size={16} /> Efectivo
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-[#F0EFEA] rounded-2xl text-xs font-bold text-[#4A5D4E] hover:bg-white transition-all uppercase tracking-widest">
              <CreditCard size={16} /> Tarjeta
            </button>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing}
            className="w-full bg-[#4A5D4E] text-white py-4 rounded-3xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#4A5D4E]/20 hover:bg-[#5D6F61] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Receipt size={18} />
                Generar Ticket
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
};
