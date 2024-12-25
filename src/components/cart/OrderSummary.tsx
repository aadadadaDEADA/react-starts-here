import React from 'react';
import { motion } from 'framer-motion';
import { UserDetails } from '@/utils/userDetailsStorage';
import PaymentButtons from './PaymentButtons';
import { Pencil, Trash2, Tag } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { CartItem } from './CartProvider';

interface OrderSummaryProps {
  total: number;
  shipping: number;
  finalTotal: number;
  userDetails: UserDetails | null;
  cartItems: CartItem[];
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
}

const OrderSummary = ({ 
  total, 
  shipping, 
  finalTotal,
  userDetails,
  cartItems,
  onEditDetails,
  onDeleteDetails
}: OrderSummaryProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-medium mb-4 text-[#471818]">Résumé de la commande</h2>
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Sous-total</span>
            <span>{total.toFixed(2)} TND</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          
          <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-100">
            <span>Total</span>
            <span className="text-[#700100]">{finalTotal.toFixed(2)} TND</span>
          </div>
        </div>

        <div className="bg-[#F8F8F8] rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-[#471818] mb-2">Informations de commande</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Pencil className="w-4 h-4 text-[#700100]" />
              <span>Modifier les détails</span>
            </div>
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#700100]" />
              <span>Supprimer les détails</span>
            </div>
          </div>
        </div>
      </div>
      
      <PaymentButtons 
        enabled={!!userDetails}
        cartItems={cartItems}
        userDetails={userDetails}
        total={total}
        shipping={shipping}
        finalTotal={finalTotal}
      />
    </motion.div>
  );
};

export default OrderSummary;
