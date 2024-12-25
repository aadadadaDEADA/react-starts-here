import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, GripVertical } from 'lucide-react';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product) => void;
}

const ProductSelectionPanel = ({ onItemDrop }: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts
  });

  const categories = ['tous', 'costume', 'veste', 'chemise', 'accessoire'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || product.category_product.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Product) => {
    e.dataTransfer.setData('product', JSON.stringify(item));
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#700100] text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              draggable
              onDragStart={(e) => handleDragStart(e, product)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white rounded-lg shadow-sm p-4 cursor-grab active:cursor-grabbing border border-gray-100 hover:shadow-md transition-all ${
                draggedItem?.id === product.id ? 'opacity-50' : ''
              }`}
            >
              <div className="relative">
                <GripVertical className="absolute top-0 right-0 text-gray-400" size={16} />
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-2"
                />
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-[#700100] font-medium">{product.price} TND</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionPanel;