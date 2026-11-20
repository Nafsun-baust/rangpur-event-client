import Image from "next/image";

const galleryItems = [
  {
    title: "Teesta River Bank Cleanup",
    location: "Kaunia, Rangpur",
    image: "/images/gallery1.jpg",
  },
  {
    title: "Campus Tree Plantation Drive",
    location: "Carmichael College, Rangpur",
    image: "/images/gallery2.jpg",
  },
  {
    title: "Winter Blanket Distribution",
    location: "Gangachara, Rangpur",
    image: "/images/gallery3.jpg",
  },
  {
    title: "Shyamasundari Canal Drive",
    location: "Shapla Chattar, Rangpur",
    image: "/images/gallery4.jpg",
  },
  {
    title: "Green Roadside Sapling Project",
    location: "BRUR Road, Rangpur",
    image: "/images/gallery5.jpg",
  },
  {
    title: "Free Community Health Camp",
    location: "Tajhat & Town Hall, Rangpur",
    image: "/images/gallery6.jpg",
  },
];

export function Gallery() {
  return (
    <section className="w-full bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Our Impact in Pictures
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Community Service Gallery
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Moments captured from social service initiatives across Rangpur
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-xl border border-border bg-white p-3 shadow-xs"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-1 pt-3 pb-1">
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}