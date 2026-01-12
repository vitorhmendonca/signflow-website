import { motion } from "framer-motion";
import logoPalmerSigns from "@/assets/logo-palmer-signs.png";
import logoKBSigns from "@/assets/logo-kb-signs.png";
import logoCreativeSignCrafters from "@/assets/logo-creative-sign-crafters.png";

const clients = [
  { name: "Palmer Signs", logo: logoPalmerSigns },
  { name: "KB Signs", logo: logoKBSigns },
  { name: "Creative Sign Crafters", logo: logoCreativeSignCrafters },
];

const ClientLogosSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            We've Worked With Industry<br />Leading Brands.
          </h2>
          <p className="text-muted-foreground text-sm">Consistent Client Results.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
          {clients.map((client, index) => (
            <motion.div 
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                width={255}
                height={160}
                loading="lazy"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
