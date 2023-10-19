import { defineCollection, z } from "astro:content";

// Meta Schema
const metaObject = z.object({
  title: z.string().optional(),
  meta_title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
});

// Buton Schema
const buttonObject = z.object({
  enable: z.boolean(),
  label: z.string(),
  link: z.string(),
});

// Social Schema
const socialObject = z.object({
  name: z.string(),
  icon: z.string(),
  link: z.string(),
});

// Banner Schema
const BannerObject = z.object({
  title: z.string(),
  description: z.string(),
});

// FEATURED TESTIMONIAL SCHEMA
const featuredTestimonalObject = z.object({
  enable: z.boolean(),
  name: z.string(),
  designation: z.string(),
  quote: z.string(),
  image: z.string(),
  video: z.object({
    enable: z.boolean(),
    video_embed_link: z.string(),
  }),
});

// INTRO SCHEMA
const introSchemaObject = z.object({
  enable: z.boolean(),
  title: z.string(),
  image: z.string(),
  content: z.string(),
  button: buttonObject,
});

// Shape with desc Item
const shapeDescObject = z.object({
  name: z.string(),
  icon: z.string(),
  content: z.string(),
});

// Flexibility
const flexibilityObject = z.object({
  enable: z.boolean(),
  title: z.string(),
  content: z.string(),
  flexibility_items: z.array(shapeDescObject),
});

// benifit
const benifitsObject = z.object({
  enable: z.boolean(),
  title: z.string(),
  content: z.string(),
  benifits_items: z.array(shapeDescObject),
});

// Post collection schema
const blogCollection = defineCollection({
  schema: metaObject.merge(
    z.object({
      banner: BannerObject.optional(),
      date: z.date().optional(),
      categories: z.array(z.string()).optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  ),
});

// Author collection schema
const authorsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// home page schema
const homePageCollection = defineCollection({
  schema: metaObject.merge(
    z.object({
      banner: z.object({
        enable: z.boolean(),
        bg_cover: z.string(),
        title: z.string(),
        content: z.string(),
        image: z.string(),
        video: z.object({
          enable: z.boolean(),
          video_embed_link: z.string(),
        }),
        form: z.object({
          enable: z.boolean(),
          form_acttion: z.string(),
          button_label: z.string(),
        }),
        button: buttonObject.merge(
          z.object({
            icon: z.string(),
            content: z.string(),
          }),
        ),
      }),

      clients_logo_slider: z.object({
        enable: z.boolean(),
        logos: z.array(z.string()),
      }),

      homepage_tab: z.object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        tablist: z.array(
          z.object({
            name: z.string(),
            title: z.string(),
            image: z.string(),
            content: z.string(),
            button: buttonObject,
          }),
        ),
      }),
      tools: z.object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        logos: z.array(z.string()),
      }),

      achivement: z.object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        funfacts: z.array(
          z.object({
            name: z.string(),
            count: z.number(),
            extension: z.string(),
          }),
        ),
        services: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
          }),
        ),
      }),

      workflow: z.object({
        enable: z.boolean(),
        title: z.string(),
        image: z.string(),
        content: z.string(),
      }),

      about_us: z.object({
        enable: z.boolean(),
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
      }),
      testimonial: z.object({
        enable: z.boolean(),
        title: z.string(),
        content: z.string(),
        button: buttonObject,
        testimonial_item: z.array(
          z.object({
            name: z.string(),
            image: z.string(),
            designation: z.string(),
            content: z.string(),
          }),
        ),
      }),
    }),
  ),
});

// about collection schema
const aboutCollection = defineCollection({
  schema: metaObject.merge(
    z.object({
      mission: z.object({
        enable: z.boolean(),
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
      }),
      funfacts: z.object({
        enable: z.boolean(),
        funfacts_item: z.array(
          z.object({
            name: z.string(),
            count: z.number(),
            extension: z.string(),
          }),
        ),
      }),
      vision: z.object({
        enable: z.boolean(),
        title: z.string(),
        image: z.string(),
        content: z.string(),
      }),

      featured_testimonial: z.object({
        enable: z.boolean(),
        name: z.string(),
        designation: z.string(),
        image: z.string(),
        quote: z.string(),
        video: z.object({
          enable: z.boolean(),
          video_embed_link: z.string(),
        }),
      }),
    }),
  ),
});

// about collection schema
const servicesCollection = defineCollection({
  schema: metaObject.merge(
    z.object({
      banner: BannerObject,
      services: z.array(
        z.object({
          name: z.string(),
          icon: z.string(),
          content: z.string(),
        }),
      ),
    }),
  ),
});

// team collection schema
const teamCollection = defineCollection({
  schema: metaObject.merge(
    z.object({
      banner: BannerObject,
      team_member: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          image: z.string(),
          group: z.string(),
          social: z.array(socialObject),
        }),
      ),
    }),
  ),
});

// Contact Collection Schema
const contactCollection = defineCollection({
  schema: metaObject.merge(
    z.object({
      banner: BannerObject,
      services: z.object({
        enable: z.boolean(),
        title: z.string(),
        service_list: z.array(z.string()),
      }),
      contact_info: z.object({
        enable: z.boolean(),
        title: z.string(),
        address_list: z.array(z.string()),
      }),
    }),
  ),
});

// How It Works collection schema
const howItWorksCollections = defineCollection({
  schema: metaObject.merge(
    z.object({
      howItWorks: z.array(
        z.object({
          title: z.string(),
          image: z.string(),
          description: z.string(),
        }),
      ),
    }),
  ),
});

// Testimonial collection schema
const testimonialCollections = defineCollection({
  schema: metaObject.merge(
    z.object({
      banner: BannerObject,
      testimonial_items: z.array(
        z.object({
          name: z.string(),
          image: z.string(),
          designation: z.string(),
          content: z.string(),
        }),
      ),
      featured_testimonial: z.object({
        enable: z.boolean(),
        name: z.string(),
        designation: z.string(),
        quote: z.string(),
        image: z.string(),
        video: z.object({
          enable: z.boolean(),
          video_embed_link: z.string(),
        }),
      }),
    }),
  ),
});

// Export collections
export const collections = {
  homepage: homePageCollection,
  about: aboutCollection,
  services: servicesCollection,
  team: teamCollection,
  blog: blogCollection,
  authors: authorsCollection,
  pages: pagesCollection,
  contact: contactCollection,
  "how-it-works": howItWorksCollections,
  testimonial: testimonialCollections,
};
