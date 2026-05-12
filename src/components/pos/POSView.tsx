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
  Package,
  Stethoscope
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
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowSuccess(true);
    setCart([]);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden md:p-0 p-2">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="relative group shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Buscar producto o servicio (F2)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 shadow-sm transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 no-scrollbar pb-10">
          {filteredProducts.map(product => (
            <motion.button
              whileHover={{ y: -4 }}
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-4 md:p-6 rounded-[32px] border border-slate-100 flex flex-col items-start text-left hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-12 h-12 ${
                product.category === ProductCategory.SERVICIO ? 'bg-indigo-50' : 'bg-amber-50'
              } rounded-full -mr-6 -mt-6 opacity-40`} />
              
              <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center relative ${
                product.category === ProductCategory.SERVICIO ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {product.category === ProductCategory.SERVICIO ? <Stethoscope size={22} /> : <Package size={22} />}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
              <h4 className="font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h4>
              <div className="flex justify-between items-end w-full mt-4">
                <span className="text-xl font-black text-slate-900">${product.price}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock < 5 ? 'text-rose-500' : 'text-slate-400'}`}>
                  Stock: {product.stock}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart / Checkout */}
      <aside className="w-full lg:w-[400px] bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden lg:h-full h-[60vh] shrink-0">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medinery-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-medinery-blue/20">
              <ShoppingCart size={20} />
            </div>
            <h3 className="font-bold text-medinery-dark">Orden de Venta</h3>
          </div>
          <button onClick={() => setCart([])} className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-600 transition-colors">Vaciar</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar relative">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Receipt size={40} />
                </div>
                <h4 className="text-xl font-black text-slate-900">¡Venta Exitosa!</h4>
                <p className="text-sm font-medium text-slate-500 mt-2">El inventario se ha actualizado correctamente.</p>
              </motion.div>
            )}

            {cart.map(item => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex-1 truncate">
                  <h5 className="text-sm font-bold text-slate-900 truncate">{item.name}</h5>
                  <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">${item.price} c/u</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-1 shadow-sm">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-slate-400 hover:text-medinery-blue hover:bg-slate-50 rounded-md transition-all"><Minus size={14} /></button>
                  <span className="text-xs font-bold text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-slate-400 hover:text-medinery-blue hover:bg-slate-50 rounded-md transition-all"><Plus size={14} /></button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-rose-200 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && !showSuccess && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-12">
              <ShoppingCart size={48} className="mb-4 text-slate-400" />
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Carrito vacío</p>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
              <span className="text-slate-900 font-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">IVA (16%)</span>
              <span className="text-slate-900 font-black">${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-end pt-4 border-t border-dashed border-slate-200">
            <span className="text-[10px] font-black text-medinery-blue uppercase tracking-[0.2em]">Total Cobro</span>
            <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">${total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 md:mt-6">
            <button className="flex flex-col items-center justify-center gap-2 py-3 md:py-4 bg-white border border-slate-100 rounded-3xl text-[10px] font-black text-slate-600 hover:border-medinery-blue hover:text-medinery-blue transition-all uppercase tracking-widest shadow-sm">
              <Banknote size={20} /> Efectivo
            </button>
            <button className="flex flex-col items-center justify-center gap-2 py-3 md:py-4 bg-white border border-slate-100 rounded-3xl text-[10px] font-black text-slate-600 hover:border-medinery-blue hover:text-medinery-blue transition-all uppercase tracking-widest shadow-sm">
              <CreditCard size={20} /> Tarjeta
            </button>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing}
            className="w-full bg-medinery-dark text-white py-4 md:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-3"
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
