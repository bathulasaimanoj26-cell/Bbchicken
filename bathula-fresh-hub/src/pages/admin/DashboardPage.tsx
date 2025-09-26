import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Save, X, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { useProducts, Product as APIProduct } from '@/hooks/use-products';

interface DashboardProduct {
  id: string;
  name: string;
  emoji: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  status: string;
}

export default function DashboardPage() {
  const { products: apiProducts, loading, error, updateProduct } = useProducts();
  const [products, setProducts] = useState<DashboardProduct[]>([
    {
      id: '1',
      name: 'Chicken',
      emoji: '🐔',
      currentPrice: 300,
      previousPrice: 280,
      unit: 'per kg',
      status: 'Fresh Today'
    },
    {
      id: '2',
      name: 'Mutton',
      emoji: '🐐',
      currentPrice: 680,
      previousPrice: 650,
      unit: 'per kg',
      status: 'Fresh Today'
    },
    {
      id: '3',
      name: 'Natukodi',
      emoji: '🐓',
      currentPrice: 380,
      previousPrice: 370,
      unit: 'per kg',
      status: 'Fresh Today'
    }
  ]);

  // Convert API products to dashboard format
  useEffect(() => {
    if (apiProducts.length > 0) {
      const dashboardProducts: DashboardProduct[] = apiProducts.map(product => ({
        id: product._id,
        name: product.name.charAt(0).toUpperCase() + product.name.slice(1),
        emoji: getEmojiForCategory(product.category),
        currentPrice: product.isSpecialOffer && product.offerPrice ? product.offerPrice : product.price,
        previousPrice: product.price,
        unit: 'per kg',
        status: product.isAvailable ? 'Fresh Today' : 'Out of Stock'
      }));
      setProducts(dashboardProducts);
    }
  }, [apiProducts]);

  const getEmojiForCategory = (category: string) => {
    switch (category) {
      case 'chicken': return '🐔';
      case 'mutton': return '🐐';
      case 'natukodi': return '🐓';
      default: return '🥩';
    }
  };

  // Update product price via API
  const updateProductPrice = async (productId: string, newPrice: number) => {
    try {
      await updateProduct(productId, { price: newPrice });
      toast.success('Price updated successfully in database!');
    } catch (error) {
      toast.error('Failed to update price in database');
      throw error;
    }
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    emoji: '',
    price: 0,
    unit: 'per kg'
  });

  const handleEditPrice = (product: DashboardProduct) => {
    setEditingId(product.id);
    setEditPrice(product.currentPrice);
  };

  const handleSavePrice = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    updateProductPrice(productId, editPrice)
      .then(() => {
        const updatedProducts = products.map(p => 
          p.id === productId 
            ? { ...p, previousPrice: p.currentPrice, currentPrice: editPrice }
            : p
        );
        setProducts(updatedProducts);
        setEditingId(null);
      })
      .catch(() => {
        // Error already handled in updateProductPrice
      });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditPrice(0);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.emoji || newProduct.price <= 0) {
      toast.error('Please fill all fields');
      return;
    }

    const product: DashboardProduct = {
      id: Date.now().toString(),
      name: newProduct.name,
      emoji: newProduct.emoji,
      currentPrice: newProduct.price,
      previousPrice: newProduct.price,
      unit: newProduct.unit,
      status: 'Fresh Today'
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', emoji: '', price: 0, unit: 'per kg' });
    setShowAddForm(false);
    toast.success('New product added successfully!');
  };

  const getPriceChange = (current: number, previous: number) => {
    if (current > previous) {
      return { type: 'increase', icon: TrendingUp, text: 'Price increased from yesterday' };
    } else if (current < previous) {
      return { type: 'decrease', icon: TrendingDown, text: 'Price decreased from yesterday' };
    }
    return { type: 'same', icon: null, text: 'No change from yesterday' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading products: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Price Management</h1>
          <p className="text-muted-foreground">Update prices and manage your products</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {/* Add New Product Form */}
      {showAddForm && (
        <Card className="border-2 border-dashed border-primary/20">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g., Fish"
                />
              </div>
              <div>
                <Label htmlFor="emoji">Emoji</Label>
                <Input
                  id="emoji"
                  value={newProduct.emoji}
                  onChange={(e) => setNewProduct({...newProduct, emoji: e.target.value})}
                  placeholder="e.g., 🐟"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                  placeholder="per kg"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddProduct}>Add Product</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const priceChange = getPriceChange(product.currentPrice, product.previousPrice);
          const isEditing = editingId === product.id;

          return (
            <Card key={product.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{product.emoji}</span>
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPrice(product)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {priceChange.icon && (
                  <div className="flex items-center gap-1 mb-2 text-sm">
                    <priceChange.icon 
                      className={`h-4 w-4 ${
                        priceChange.type === 'increase' ? 'text-red-500' : 'text-green-500'
                      }`} 
                    />
                    <span className="text-muted-foreground">₹{product.previousPrice}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold">₹</span>
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-20 h-8"
                        />
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => handleSavePrice(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold">₹{product.currentPrice}</div>
                      <div className="text-sm text-muted-foreground">{product.unit}</div>
                    </div>
                  )}
                </div>
                
                {priceChange.type !== 'same' && !isEditing && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {priceChange.text}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">📱 Order Management</h3>
        <p className="text-sm text-muted-foreground">
          Orders are automatically sent to WhatsApp (+91 9014105470). Customers can place orders directly from the website, and you'll receive them on WhatsApp for easy processing.
        </p>
      </div>
    </div>
  );
}
