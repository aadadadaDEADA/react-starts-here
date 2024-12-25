import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Gift, Package, Info } from 'lucide-react';
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

  return (
    <div className="relative h-[500px] w-full rounded-xl bg-gradient-to-b from-[#F1F0FB] to-[#E5DEFF] shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      
      {/* Gift basket visualization */}
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-64 h-64 relative"
        >
          {/* Basket base with gradient */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56">
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-[#700100] to-[#9b87f5] rounded-b-full opacity-80"
              style={{
                clipPath: 'polygon(0% 30%, 100% 30%, 85% 100%, 15% 100%)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            />
            
            {/* Decorative ribbon */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute top-1/3 left-0 w-full h-4 bg-[#8B5CF6]"
              style={{ transformOrigin: 'center' }}
            />
          </div>

          {/* Items grid */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-3 w-48">
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
                        <div className="w-14 h-14 bg-white rounded-lg shadow-lg overflow-hidden p-2">
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
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#700100] text-white rounded-full flex items-center justify-center text-[10px]"
                          >
                            {index + 1}
                          </motion.div>
                        )}
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/80 backdrop-blur-md border border-[#700100]/20">
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
            <Gift className="w-16 h-16 text-[#700100] mx-auto mb-4" />
            <p className="text-[#700100] font-medium">Glissez vos articles ici</p>
            <p className="text-sm text-gray-500 mt-2">
              Créez votre pack cadeau personnalisé
            </p>
          </motion.div>
        )}

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