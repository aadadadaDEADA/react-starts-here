import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Gift, Package, Info, Sparkles } from 'lucide-react';
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
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#F1F0FB]/50 to-[#E5DEFF]/50" />
      
      {/* Gift basket visualization */}
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-80 h-80 relative"
        >
          {/* Basket base with gradient */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72">
            <motion.div 
              className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#700100] to-[#9b87f5] rounded-b-full opacity-80"
              style={{
                clipPath: 'polygon(0% 30%, 100% 30%, 85% 100%, 15% 100%)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
              animate={{
                scale: isDraggingOver ? 1.05 : 1,
                boxShadow: isDraggingOver ? '0 8px 40px rgba(0, 0, 0, 0.2)' : '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            {/* Decorative ribbon */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute top-1/3 left-0 w-full h-6 bg-[#8B5CF6]"
              style={{ transformOrigin: 'center' }}
            />
          </div>

          {/* Items grid */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-4 w-64">
            <AnimatePresence>
              {items.map((item, index) => (
                <TooltipProvider key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        onHoverStart={() => setHoveredItem(index)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className="relative cursor-pointer"
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-16 h-16 bg-white rounded-xl shadow-lg overflow-hidden p-2 border border-[#700100]/10">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Package className="w-full h-full text-[#700100]" />
                          )}
                        </div>
                        
                        {hoveredItem === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#700100] text-white rounded-full flex items-center justify-center text-xs font-medium"
                          >
                            {index + 1}
                          </motion.div>
                        )}
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/95 backdrop-blur-md border border-[#700100]/20">
                      <div className="p-2">
                        <p className="font-medium text-[#700100]">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.price} TND</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Empty state with animation */}
        {items.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
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
            >
              <Gift className="w-20 h-20 text-[#700100] mx-auto mb-4" />
            </motion.div>
            <p className="text-[#700100] font-medium text-lg">Glissez vos articles ici</p>
            <p className="text-sm text-gray-500 mt-2">
              Créez votre pack cadeau personnalisé
            </p>
          </motion.div>
        )}

        {/* Drag effect */}
        <AnimatePresence>
          {isDraggingOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute inset-0 bg-[#700100]/5 backdrop-blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-16 h-16 text-[#700100]" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors">
                  <Info className="w-5 h-5 text-[#700100]" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  Faites glisser les articles pour créer votre pack
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </div>
  );
};

export default GiftBasket3D;