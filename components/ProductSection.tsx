import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  products: Product[];
  id?: string;
  subtitle?: string;
  icon?: string;
  iconClass?: string;
};

export default function ProductSection({ title, products, id, subtitle, icon, iconClass = "" }: Props) {
  return (
    <section id={id} className="scroll-mt-24 mt-10">
      <h2 className="text-xl font-bold flex items-center gap-2">
        {icon && <span className={`text-base ${iconClass}`}>{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <ProductCard key={`${p.id}-${i}`} product={p} />
        ))}
      </div>
    </section>
  );
}