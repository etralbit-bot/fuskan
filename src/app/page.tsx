import Link from "next/link";
import CalBookingButton from "@/components/CalBookingButton";
import FirstVisitDialog from "@/components/FirstVisitDialog";
import ProductCardWithLike from "@/components/ProductCardWithLike";
import RevealOnView from "@/components/RevealOnView";
import { testimonials } from "@/lib/mockData";
import { homeMetadata } from "@/lib/seo";
import { getCategories, getProducts } from "@/lib/sanityData";

export const metadata = homeMetadata();

export default async function Home() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const topCategories = categories.slice(0, 3);
  const featuredProducts = products.filter((product) => product.featured);
  const sliderTestimonials = [...testimonials, ...testimonials];
  return (
    <div className="space-y-16 pb-0">
      <FirstVisitDialog />
      <section
        className="-mx-4 -mt-28 flex min-h-screen w-[calc(100%+2rem)] items-center justify-center bg-cover bg-center text-white md:-mx-6 md:w-[calc(100%+3rem)]"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(7,10,14,0.92) 0%, rgba(7,10,14,0.66) 45%, rgba(7,10,14,0.5) 100%), url('https://images.unsplash.com/photo-1727524366429-27de8607d5f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        <RevealOnView className="w-full max-w-6xl px-4 py-20 md:px-12 md:py-28">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-300">
            Leather Manufacturing Factory
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">
            Engineered Leather Goods
            <br />
            For Global Brands.
            <br />
            Built At Factory Scale.
          </h1>
          <p className="mt-6 max-w-3xl text-sm text-zinc-100 md:text-base">
            We manufacture jackets, bags, wallets, belts, and private-label leather accessories
            with consistent quality, production transparency, and export-ready compliance.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/start-order"
              className="rounded-full bg-blue-700 px-7 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800"
            >
              Request Factory Quote
            </Link>
            <Link
              href="/categories"
              className="rounded-full border border-zinc-200/80 px-7 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-zinc-900"
            >
              View Product Lines
            </Link>
          </div>
          <div className="mt-10 hidden max-w-3xl gap-3 sm:grid sm:grid-cols-3">
            {[
              { label: "Units / month", value: "25k+" },
              { label: "QC checkpoints", value: "7 stages" },
              { label: "Export markets", value: "20+" },
            ].map((item) => (
              <article key={item.label} className="rounded-2xl border border-white/15 bg-black/25 p-4">
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-200">{item.label}</p>
              </article>
            ))}
          </div>
        </RevealOnView>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            "In-house pattern and sample room",
            "Dedicated leather cutting and stitching lines",
            "Metal fitting, edge paint, and finishing stations",
            "Packed for wholesale and retail requirements",
          ].map((line) => (
            <div key={line} className="rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-sm font-medium">
              {line}
            </div>
          ))}
        </div>
      </section>

      <section>
        <RevealOnView className="mb-2">
          <h2 className="text-3xl font-black uppercase tracking-tight">Factory Product Lines</h2>
        </RevealOnView>
        <RevealOnView className="mb-5 max-w-2xl text-base text-zinc-600" delayMs={70}>
          Built for wholesale buying cycles and private-label customization.
        </RevealOnView>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topCategories.map((category, index) => (
            <RevealOnView key={category.slug} delayMs={index * 70}>
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-200">
                    Category
                  </p>
                  <h3 className="mt-2 text-xl font-black uppercase leading-tight">
                    {category.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-zinc-100/95">{category.description}</p>
                  <p className="mt-4 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">
                    View category
                  </p>
                </div>
              </Link>
            </RevealOnView>
          ))}
        </div>
        {categories.length > 3 && (
          <div className="mt-6 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-xs font-bold uppercase tracking-wide text-zinc-700 hover:bg-zinc-100"
            >
              See more categories
            </Link>
          </div>
        )}
      </section>

      <section className="pt-6">
        <RevealOnView>
          <h2 className="text-3xl font-black uppercase tracking-tight">Featured products</h2>
        </RevealOnView>
        <RevealOnView className="mt-2 max-w-2xl text-base text-zinc-600" delayMs={70}>
          Selected products from active production programs and repeat buyer catalogues.
        </RevealOnView>
        {featuredProducts.length > 0 ? (
          <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <RevealOnView key={product.slug} delayMs={index * 50}>
                <ProductCardWithLike product={product} />
              </RevealOnView>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-zinc-600">No featured products selected yet.</p>
        )}
      </section>

      <RevealOnView>
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 px-4 py-12 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Production Workflow
            </p>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
              Precision-Driven Production For Scalable Leather Programs
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              Every order moves through an accountable, factory-controlled process from sourcing
              to shipment dispatch.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              { icon: "01", title: "Sampling", text: "Tech pack review, material match, and prototype approvals." },
              { icon: "02", title: "Production", text: "Leather cutting, stitching, assembly, and line balancing." },
              { icon: "03", title: "Inspection", text: "Final QC, metal check, finishing, and secure export packing." },
            ].map((step, index) => (
              <RevealOnView key={step.title} delayMs={index * 80}>
                <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5 text-center">
                  <p className="text-lg font-black text-blue-400">{step.icon}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white">{step.title}</p>
                  <p className="mt-2 text-xs text-zinc-300">{step.text}</p>
                </article>
              </RevealOnView>
            ))}
          </div>

          <div className="mt-10 text-center">
            <CalBookingButton className="rounded-full bg-blue-700 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800">
              Book Factory Meeting
            </CalBookingButton>
          </div>
        </section>
      </RevealOnView>

      <section className="rounded-3xl border border-zinc-200 bg-white px-4 py-10 text-zinc-900 md:px-8">
        <RevealOnView>
          <h2 className="text-3xl font-black uppercase tracking-tight">Testimonials</h2>
        </RevealOnView>
        <RevealOnView className="mt-2 max-w-2xl text-sm text-zinc-600" delayMs={70}>
          Trusted by importers, sourcing teams, and private-label brands.
        </RevealOnView>
        <div className="testimonial-slider mt-6 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/70 p-2">
          <div className="testimonial-track flex w-max gap-4">
            {sliderTestimonials.map((item, index) => (
              <article
                key={`${item.name}-${item.company}-${index}`}
                className="w-[300px] shrink-0 rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:w-[360px]"
              >
                <p className="text-3xl leading-none text-blue-200">“</p>
                <p className="mt-2 text-sm leading-6 text-zinc-700">{item.quote}</p>
                <div className="mt-5 border-t border-zinc-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-900">{item.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-zinc-500">
                    {item.role} · {item.company}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="-mx-4 w-[calc(100%+2rem)] bg-cover bg-center md:-mx-6 md:w-[calc(100%+3rem)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(9,9,11,0.84) 0%, rgba(9,9,11,0.55) 100%), url('https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="flex min-h-[620px] items-center justify-center px-4 py-14 text-center md:px-12">
          <RevealOnView className="flex flex-col items-center">
            <h2 className="max-w-2xl text-3xl font-black uppercase text-white md:text-5xl">
              Ready To Launch Your Leather Collection?
            </h2>
            <Link
              href="/start-order"
              className="mt-6 inline-block rounded-full bg-blue-700 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-800"
            >
              Start Production Brief
            </Link>
          </RevealOnView>
        </div>
      </section>
    </div>
  );
}
