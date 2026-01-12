import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

// Placeholder images - replace with actual project photos
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&h=400&fit=crop",
    title: "Retail Storefront Sign",
    category: "Channel Letters",
    alt: "Illuminated channel letter signage for retail storefront - completed sign installation project"
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    title: "Commercial Building",
    category: "Monument Signs",
    alt: "Large monument sign for commercial building entrance - professional signage installation"
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    title: "Office Complex",
    category: "Pylon Signs",
    alt: "Tall pylon sign for office complex - commercial wayfinding signage project"
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    title: "Corporate Lobby",
    category: "Interior Signage",
    alt: "Interior signage for corporate lobby - custom branded environmental graphics"
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
    title: "Business Park",
    category: "Wayfinding",
    alt: "Wayfinding directional signage for business park - exterior sign system installation"
  },
  {
    src: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&h=400&fit=crop",
    title: "Restaurant Facade",
    category: "LED Signs",
    alt: "LED illuminated sign for restaurant facade - energy-efficient digital signage"
  },
];

const Gallery = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://signflow.us/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gallery",
        "item": "https://signflow.us/gallery"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Project Gallery - SignFlow Success Stories"
        description="Explore our portfolio of completed signage projects. See the quality craftsmanship and successful installations from sign companies we've helped grow."
        canonical="https://signflow.us/gallery"
        ogImage="https://signflow.us/og-gallery.jpg"
      />
      <StructuredData data={breadcrumbSchema} />
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Camera className="text-primary" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Project Gallery
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore our portfolio of completed signage projects. From channel letters to monument signs, see the quality craftsmanship we deliver.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wider">
                      {image.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {image.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coming Soon Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12 p-8 bg-secondary/50 rounded-2xl"
            >
              <p className="text-muted-foreground">
                More projects coming soon! We regularly update our gallery with new completed work.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
