import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../cart/CartProvider";
import { toast } from "@/components/ui/use-toast";
import { playTickSound } from "@/utils/audio";
import ProductSelectionPanel from "./ProductSelectionPanel";
import GiftBasket3D from "./GiftBasket3D";
import PackSummary from "./PackSummary";
import ConfirmationButton from "./ConfirmationButton";
import { Product } from "@/types/product";

export interface GiftPack {
  items: Product[];
  totalPrice: number;
  note?: string;
  ribbonColor?: string;
}

const GiftApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [packNote, setPackNote] = useState("");
  const [ribbonColor, setRibbonColor] = useState("#700100");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleItemDrop = (item: Product) => {
    setSelectedItems((prev) => [...prev, item]);
    playTickSound();
    toast({
      title: "Item Added! 🎁",
      description: "Don't forget you can add a personal message to your gift!",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleConfirmPack = async () => {
    setIsLoading(true);
    
    // Add items to cart one by one with animation delay
    for (const item of selectedItems) {
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart({
        ...item,
        quantity: 1,
        personalization: packNote,
      });
    }

    toast({
      title: "Pack Added to Cart! 🎉",
      description: "Would you like to proceed to checkout?",
      action: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#700100] px-4 py-2 rounded-md font-medium"
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </motion.button>
      ),
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F1F0FB]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-[#700100] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-[#700100] font-medium">Creating your gift pack...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F0FB] p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Selection Panel */}
        <div className="lg:col-span-4">
          <ProductSelectionPanel onItemDrop={handleItemDrop} />
        </div>

        {/* 3D Gift Basket */}
        <div className="lg:col-span-4">
          <GiftBasket3D items={selectedItems} />
        </div>

        {/* Pack Summary */}
        <div className="lg:col-span-4">
          <PackSummary
            items={selectedItems}
            note={packNote}
            onNoteChange={setPackNote}
            ribbonColor={ribbonColor}
            onRibbonColorChange={setRibbonColor}
          />
          <ConfirmationButton
            onConfirm={handleConfirmPack}
            disabled={selectedItems.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default GiftApp;