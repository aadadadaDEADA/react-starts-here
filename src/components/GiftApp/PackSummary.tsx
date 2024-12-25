import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PackSummaryProps {
  items: Product[];
  note: string;
  onNoteChange: (note: string) => void;
  ribbonColor: string;
  onRibbonColorChange: (color: string) => void;
}

const PackSummary = ({
  items,
  note,
  onNoteChange,
  ribbonColor,
  onRibbonColorChange
}: PackSummaryProps) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div 
      className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 space-y-6 shadow-xl border border-white/20"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-serif text-[#700100]">Résumé du Pack</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Articles</span>
          <span className="font-medium">{items.length}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Prix Total</span>
          <span className="font-medium">{totalPrice.toFixed(2)} TND</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Message Personnel</Label>
          <Textarea
            id="note"
            placeholder="Ajoutez votre message personnalisé ici..."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            className="min-h-[100px] bg-white/50 backdrop-blur-sm border-white/30"
          />
        </div>

        <div className="space-y-2">
          <Label>Couleur du Ruban</Label>
          <div className="flex gap-2">
            {['#700100', '#1A1F2C', '#F1F0FB', '#FFD700'].map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === ribbonColor ? 'border-gray-900' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onRibbonColorChange(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Articles Sélectionnés:</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center p-2 bg-white/50 backdrop-blur-sm rounded-lg"
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium">{item.price} TND</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PackSummary;