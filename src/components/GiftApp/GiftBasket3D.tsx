import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Gift, Package, ShoppingBag, Plus } from 'lucide-react';
import { playTickSound } from '@/utils/audio';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GiftBasket3DProps {
  items: Product[];
}

const GiftBasket3D = ({ items }: GiftBasket3DProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedItem = JSON.parse(e.dataTransfer.getData('product'));
    console.log('Item dropped:', droppedItem);
    playTickSound();
  };

  return (
    <div 
      className="relative h-[600px] w-full rounded-2xl bg-white shadow-2xl overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header with total price */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-[#700100] to-transparent text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Votre Pack Cadeau</h3>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xl font-bold">{totalPrice.toFixed(2)} TND</span>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="p-6 mt-16 h-full overflow-y-auto">
        <AnimatePresence>
          {items.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative group cursor-pointer">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-[#700100]">{item.price} TND</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: isDraggingOver ? 1.1 : 1,
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 0.2,
                  },
                }}
                className="mb-4"
              >
                <Gift className="w-20 h-20 text-[#700100] mx-auto" />
              </motion.div>
              <h3 className="text-xl font-medium text-[#700100] mb-2">
                Créez Votre Pack Cadeau
              </h3>
              <p className="text-gray-500 max-w-sm">
                Glissez et déposez vos articles préférés ici pour créer un pack cadeau unique
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drop overlay */}
      <AnimatePresence>
        {isDraggingOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#700100]/10 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="bg-white/90 rounded-full p-6"
            >
              <Plus className="w-12 h-12 text-[#700100]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftBasket3D;