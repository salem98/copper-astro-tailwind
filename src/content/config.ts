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
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
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
    }),
  ),
});

// Export collections
export const collections = {
  homepage: homePageCollection,
  blog: blogCollection,
  authors: authorsCollection,
  pages: pagesCollection,
};
