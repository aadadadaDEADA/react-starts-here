import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { Gift } from 'lucide-react';

interface GiftBasket3DProps {
  items: Product[];
}

const GiftBasket3D = ({ items }: GiftBasket3DProps) => {
  return (
    <div className="h-[400px] w-full rounded-xl bg-white shadow-lg overflow-hidden p-4">
      <div className="relative h-full w-full">
        {/* Basket visualization */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#700100] rounded-b-full"
          style={{
            clipPath: 'polygon(0% 30%, 100% 30%, 85% 100%, 15% 100%)',
          }}
        />
        
        {/* Items in basket */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 w-40">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0, y: -50 }}
              animate={{ 
                scale: 1, 
                y: 0,
                transition: { delay: index * 0.1 } 
              }}
              className="relative"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-12 h-12 bg-[#F1F0FB] rounded-lg shadow-md flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#700100]" />
                </div>
              )}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-[#700100] text-white rounded-full flex items-center justify-center text-xs"
              >
                {item.quantity}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <Gift className="w-12 h-12 text-[#700100] mx-auto mb-2" />
            <p className="text-gray-500">Ajoutez des articles à votre panier cadeau</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftBasket3D;