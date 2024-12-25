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
      title: "Article Ajouté! 🎁",
      description: "N'oubliez pas que vous pouvez ajouter un message personnalisé à votre cadeau!",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleConfirmPack = async () => {
    setIsLoading(true);
    
    for (const item of selectedItems) {
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart({
        ...item,
        quantity: 1,
        personalization: packNote,
      });
    }

    toast({
      title: "Pack Ajouté au Panier! 🎉",
      description: "Souhaitez-vous procéder au paiement?",
      action: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#700100] px-4 py-2 rounded-md font-medium"
          onClick={() => navigate('/cart')}
        >
          Voir le Panier
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
          <p className="mt-4 text-[#700100] font-medium">Création de votre pack cadeau...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#E5DEFF] p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductSelectionPanel onItemDrop={handleItemDrop} />
        </motion.div>

        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <GiftBasket3D items={selectedItems} />
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default GiftApp;