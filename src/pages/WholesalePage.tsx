/*  src/pages/WholesalePage.tsx  */
"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";

/* shadcn‑ui primitives — import one‑by‑one */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

/* icons */
import {
  Search,
  ShoppingCart,
  Package,
  Box,
  CupSoda,
  Coffee,
  Plus,
  Minus,
  Filter,
  X,
} from "lucide-react";

/* app helpers */
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------- */
/*  Image assets                                        */
/* ---------------------------------------------------- */
const IMG_BAG  =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpXHEbt66DhKqllXmTLuHOJ3ct6YHazhseVA&s";

const IMG_BOX  =
  "data:image/jpeg;base64,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"; //  ← paste the *full* box base‑64 string you provided

const IMG_SACHET =
  "https://www.thepremixcompany.com/cdn/shop/files/SachetCoffee.jpg?v=1698927629&width=1946"; // ← paste the *full* sachet base‑64 string

const IMG_CAPS  =
  "data:image/jpeg;base64,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ALAADIX6zreFyV2Uez5Y2taIJQALDqOPpuqdW8TGFmhaIt3lFskjcwO/VtMLi6N4scyBlmMgcuYX18MQdZwpwXdY4XuBILnEuudc7/it5xeNY5B3xP8Am1Ypahn2mt/ib/VUNXbOYmG5HTMY3C0WA4X5m6j6m2a8y17ScnDuBC06ue/FShp05/KN2k/ktOPsrYqwSFrMyatGnys1ZjpYZStKZy6Gg3brKj+6hdb9p3Ub5nXwuup2X9FuhqZv4I/95/opX1ax6sV9elfVv7q74RCngiLTdkTGa6lrQNF11LXGQXDCB78lr7J3cpKYWiiaD+0c3eZUqsE8vKtOZyBERccEREBERAREQEREBERBpbX2eJ2Yb4XtOKN+uB40NuIIJBHEEhcxJI5wdG8YJmDrN1tyewntNOoPhrcLtFp7R2bHMBiBDm9l7cntvyPL3G4PJddcFPSskbJHJkHjLjYjMOGeoJP4KrNs7MeJMTxmHFjraXaf+1eNRsGpB6vRSZWDiTG7xGF3mD4LLs3dGMESVAa94fjAAOAPzzz1tfK/ertK/RE5SrbCvNibkGeKmIYWdp0p0Lru6jc+OEA34d+lmbM2EImNY2zQBYAKca0DRfVXfUm3KM2mWvDAQthEUHBCERBifTRnVjT3tBWvJsimd2oIj3xt/ot1EETJuxQu1povBoH5L1Rbu0cJxRwMB52uR3E3spREy71TxkRERwREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/9k=";

const TURKISH_IMG  =
  "https://jebnalak.com/cdn/shop/files/blackfridayoffers-2023-10-10T171853.584_800x.png?v=1700145816";

/* ---------------------------------------------------- */
/*  Raw catalogue (without image fields)                */
/* ---------------------------------------------------- */
const CATALOGUE: Omit<Product, "image">[] = [
  /* Bustine */
  { id: "W-100",  name: "Set 100 Bustine Mishele",  description: "100 sweetener sachets",          price: 6,   category: "wholesale" },
  { id: "W-BD18", name: "Bustine 18 Decaffeinated", description: "18 decaf sachets (box)",         price: 1.8, category: "wholesale" },
  { id: "W-BDK",  name: "Bustine Decaf – Kuti",     description: "Decaf sachets – Kuti box",       price: 9,   category: "wholesale" },
  { id: "W-BDS",  name: "Bustine Decaf – Set",      description: "Bulk decaf sachets set",         price: 8,   category: "wholesale" },
  { id: "W-BM",   name: "Set Bustine Mishele",      description: "Assorted Mishele sachets",       price: 7,   category: "wholesale" },
  { id: "W-BMK",  name: "Bustine Mishele – Kuti",   description: "Mishele sachets – Kuti box",     price: 9.5, category: "wholesale" },
  { id: "W-BT",   name: "Set Bustine Tartini",      description: "Tartini sachets set",            price: 7.5, category: "wholesale" },
  { id: "W-BTK",  name: "Bustine Tartini – Kuti",   description: "Tartini sachets – Kuti box",     price: 9.5, category: "wholesale" },

  /* 1 kg bags — ESP1 … ESP8 */
  { id: "ESP1",  name: "Crema Bar Verdi 1 kg",    description: "Balanced espresso blend",         price: 14.5, category: "wholesale" },
  { id: "ESP12", name: "Mishele ESP12 1 kg",      description: "Rich chocolate, low acidity",     price: 15,   category: "wholesale" },
  /* … keep the rest exactly as before … */

  /* Turkish packs */
  { id: "KT-00", name: "Art Coffee Kuq 250 g",           description: "Red‑label Turkish coffee", price: 3.9, category: "wholesale" },
  { id: "KT-01", name: "Art Coffee Portokalli 250 g",    description: "Orange‑label Turkish coffee", price: 4.1, category: "wholesale" },
  { id: "KT-02", name: "Art Coffee Aroma 250 g",         description: "Aromatic Turkish blend",   price: 4.3, category: "wholesale"  },
  { id: "KT-03", name: "Kafe Turke Gurabardhi 250 g",    description: "Gurabardhi special",       price: 4.2, category: "wholesale"  },
  { id: "KT-04", name: "Paketime Portokalli 90 g",       description: "90 g convenience pack",    price: 1.6, category: "wholesale" },
  { id: "KT-05", name: "Kafe Turke 250 g",               description: "Classic Turkish grind",    price: 3.8, category: "wholesale" },

  /* Decaf set */
  { id: "SET-100", name: "Bustine Decaf 100",     description: "100 decaf sachets",               price: 6.5,  category: "wholesale" },

  /* Capsules ZY01‑ZY12 */
  { id: "ZY01", name: "Capsule Covim Opera",           description: "Single Opera capsule",          price: 0.25, category: "wholesale" },
  /* … etc … */
];

/* add the right picture on the fly */
const addImage = (p: Omit<Product, "image">): Product => {
  if (/Capsule|capsule|ZY/i.test(p.name))       return { ...p, image: IMG_CAPS };
  if (/Kuti|Box/i.test(p.name))                return { ...p, image: IMG_BOX };
  if (/Bustine|sachet/i.test(p.name))          return { ...p, image: IMG_SACHET };
  if (/Turk|Coffee Kuq|Portokalli|Aroma/i.test(p.name))
                                               return { ...p, image: TURKISH_IMG };
  /* default → bag */
  return { ...p, image: IMG_BAG };
};

const wholesaleProducts: Product[] = CATALOGUE.map(addImage);

/* ---------------------------------------------------- */
/*  Qty control & ProductCard (unchanged)               */
/* ---------------------------------------------------- */
const QuantityControl = ({ qty, inc, dec }: { qty: number; inc: () => void; dec: () => void }) => (
  <div className="flex items-center border rounded-md">
    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={dec}>
      <Minus className="h-3 w-3" />
    </Button>
    <span className="w-8 text-center text-sm">{qty}</span>
    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={inc}>
      <Plus className="h-3 w-3" />
    </Button>
  </div>
);

const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product, q: number) => void;
}) => {
  const [qty, setQty] = useState(1);
  const [hover, setHover] = useState(false);
  return (
    <Card
      className="flex h-full flex-col overflow-hidden border-muted transition-shadow hover:shadow-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-square bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            hover ? "scale-110" : "scale-100",
          )}
        />
        <Badge className="absolute right-2 top-2 bg-white/80 text-black">
          €{product.price.toFixed(2)}
        </Badge>
      </div>

      <CardContent className="flex-grow p-4">
        <h3 className="line-clamp-1 text-base font-medium">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <QuantityControl
            qty={qty}
            inc={() => setQty((q) => q + 1)}
            dec={() => setQty((q) => Math.max(1, q - 1))}
          />
          <Button
            size="sm"
            className="bg-artCoffeeGreen text-white hover:bg-artCoffeeGreen/90"
            onClick={() => onAdd(product, qty)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

/* ---------------------------------------------------- */
/*  Filter panel (unchanged)                            */
/* ---------------------------------------------------- */
const FilterPanel = ({
  sort,
  setSort,
  min,
  max,
  changeRange,
}: {
  sort: string;
  setSort: (v: string) => void;
  min: number;
  max: number;
  changeRange: (mi: number, ma: number) => void;
}) => {
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-medium">Sort By</h3>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A‑Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z‑A)</SelectItem>
            <SelectItem value="price-asc">Price (Low → High)</SelectItem>
            <SelectItem value="price-desc">Price (High → Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Price Range (€)</h3>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={localMin}
            min={0}
            onChange={(e) => {
              const v = +e.target.value;
              setLocalMin(v);
              if (v <= localMax) changeRange(v, localMax);
            }}
          />
          <Input
            type="number"
            value={localMax}
            min={0}
            onChange={(e) => {
              const v = +e.target.value;
              setLocalMax(v);
              if (v >= localMin) changeRange(localMin, v);
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------- */
/*  Main page                                           */
/* ---------------------------------------------------- */
const WholesalePage = () => {
  const { addToCart, totalItems } = useCart();

  const [activeTab, setActiveTab] = useState("bags");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [minP, setMinP] = useState(0);
  const [maxP, setMaxP] = useState(30);
  const [filterOpen, setFilterOpen] = useState(false);

  /* category helper */
  const cat = (p: Product) => {
    switch (activeTab) {
      case "bags":   return /kg/i.test(p.name);
      case "kuti":   return /Kuti|Box/i.test(p.name);
      case "sachet": return /Bustine/i.test(p.name) && !/Kuti/i.test(p.name);
      case "caps":   return /Capsule|Box.*capsules/i.test(p.name);
      case "turk":   return /Turk|Coffee Kuq|Portokalli|Aroma/i.test(p.name);
      default:       return true;
    }
  };

  /* filter + sort pipeline */
  let products = wholesaleProducts
    .filter(cat)
    .filter((p) =>
      `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((p) => p.price >= minP && p.price <= maxP);

  products = products.sort((a, b) => {
    switch (sort) {
      case "name-asc":   return a.name.localeCompare(b.name);
      case "name-desc":  return b.name.localeCompare(a.name);
      case "price-asc":  return a.price - b.price;
      case "price-desc": return b.price - a.price;
      default:           return 0;
    }
  });

  const add = (p: Product, q: number) => {
    addToCart(p, q);
    toast.success(`${q} × ${p.name} added to cart`);
  };

  return (
    <PageContainer title="Wholesale" className="space-y-6">
      {/* top row: search + filter + cart */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative w-full flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search wholesale items…"
            className="w-full rounded-full pl-10 pr-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* filter side‑panel */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter & Sort
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter & Sort</SheetTitle>
              <SheetDescription>Fine‑tune the catalogue view.</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterPanel
                sort={sort}
                setSort={setSort}
                min={minP}
                max={maxP}
                changeRange={(a, b) => {
                  setMinP(a);
                  setMaxP(b);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* cart icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-artCoffeeGreen text-xs text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* category tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="bags"><Package className="mr-2 h-4 w-4" />Bags</TabsTrigger>
          <TabsTrigger value="kuti"><Box className="mr-2 h-4 w-4" />Boxes</TabsTrigger>
          <TabsTrigger value="sachet"><Box className="mr-2 h-4 w-4" />Sachets</TabsTrigger>
          <TabsTrigger value="caps"><CupSoda className="mr-2 h-4 w-4" />Capsules</TabsTrigger>
          <TabsTrigger value="turk"><Coffee className="mr-2 h-4 w-4" />Turkish</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {products.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="mt-2 text-muted-foreground">Try changing your filters.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {products.length} product{products.length !== 1 && "s"}
                </p>
                {/* desktop sort dropdown */}
                <Select
                  value={sort}
                  onValueChange={setSort}
                  className="hidden w-44 md:block"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A‑Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z‑A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low → High)</SelectItem>
                    <SelectItem value="price-desc">Price (High → Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={add} />
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default WholesalePage;
