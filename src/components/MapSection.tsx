import { motion } from "framer-motion";
import usMapHighlighted from "@/assets/us-map-highlighted.png";
import { scrollToContact } from "@/lib/utils";

const MapSection = () => {

  return (
    <section className="py-20 section-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="font-semibold text-xs tracking-widest uppercase mb-3 block" style={{ color: '#6db1ee' }}>
            SIGNFLOW AT SCALE
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Helping Businesses Grow
          </h2>
          <p className="text-gray-300 max-w-4xl mx-auto text-sm md:text-base">
            Working exclusively with U.S. sign companies—whether you serve a single state or operate nationwide. Plug into our proven lead generation network and start closing more projects across your service area.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-10 flex justify-center"
        >
          <img
            src={usMapHighlighted}
            alt="US Map showing SignFlow service areas"
            width={768}
            height={538}
            loading="lazy"
            className="w-full h-auto"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <span className="text-white text-base md:text-lg">
            Check the availability of your area:
          </span>
          <button
            onClick={scrollToContact}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Inquire Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
