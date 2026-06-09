import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-black/10 py-20">
        <Image
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=80"
          alt="African market"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/40" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Our Story
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-brand-black sm:text-5xl">
            Rooted in heritage, delivered with pride
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-invert max-w-none space-y-6 text-black/70">
          <p className="text-lg leading-relaxed">
            Rooted Afrika was born from a simple belief: everyone deserves
            access to the vibrant, authentic flavours of African agriculture —
            no matter where they live.
          </p>
          <p className="leading-relaxed">
            Growing up surrounded by bustling markets filled with ripe plantains,
            fragrant spices, and seasonal harvests, our founders understood that
            food is more than sustenance — it is memory, culture, and connection.
            When they moved abroad, finding quality African produce proved
            difficult. Rooted Afrika was created to bridge that gap.
          </p>
          <p className="leading-relaxed">
            Today we partner directly with trusted growers and suppliers across
            West Africa, East Africa, and the Caribbean diaspora. Every avocado,
            yam, and suya blend is selected for freshness, authenticity, and the
            stories they carry from farm to your kitchen.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            { stat: "13+", label: "Premium Products" },
            { stat: "3", label: "Product Categories" },
            { stat: "100%", label: "Quality Commitment" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-6 text-center"
            >
              <p className="text-3xl font-bold text-brand-gold">{item.stat}</p>
              <p className="mt-1 text-sm text-black/60">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-black">
            Ready to taste the difference?
          </h2>
          <Link href="/products" className="mt-6 inline-block">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
