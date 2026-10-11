import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import EmptyState from "@/components/EmptyState";
import SortableProducts from "@/components/SortableProducts";

// In Next 15+, params is a Promise
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug).catch(() => []), // a bad slug shouldn't crash the page
  ]);

  const category = categories.find((c) => c.slug === slug);

  if (!category || products.length === 0) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি"
        message="ক্যাটাগরিটি নেই অথবা এতে কোনো পণ্য নেই।"
      />
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-card p-5">
        <span className="text-4xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-sm text-gray-500">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <SortableProducts products={products} />
    </div>
  );
}