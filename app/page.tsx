import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.changePct > 0)
    .sort((a, b) => b.changePct - a.changePct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.changePct < 0)
    .sort((a, b) => a.changePct - b.changePct)
    .slice(0, 6);

  return (
    <>
      <Hero />
      <ProductSection title="আজ দাম বেড়েছে" icon="▲" iconClass="text-red-600" products={risers} />
      <ProductSection title="আজ দাম কমেছে" icon="▼" iconClass="text-green-600" products={fallers} />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}