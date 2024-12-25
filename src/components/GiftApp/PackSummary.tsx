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
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-serif text-[#700100]">Pack Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Items</span>
          <span className="font-medium">{items.length}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price</span>
          <span className="font-medium">{totalPrice.toFixed(2)} TND</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Personal Note</Label>
          <Textarea
            id="note"
            placeholder="Add a personal message to your gift..."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Ribbon Color</Label>
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
        <h3 className="font-medium text-gray-900">Selected Items:</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium">{item.price} TND</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackSummary;