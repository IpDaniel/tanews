// to do, import fake data in the same format as the
// schmas provided in schema.type.ts.

import { Article } from "./schema.type";

export const sample_article_1: Article = {
  article_id: "1",
  author_id: "sarah_johnson", // Placeholder ID for the author
  text: `The Bethesda Community Center is set to undergo a transformative renovation after being awarded a $2 million grant. This funding will enable the center to modernize its facilities, introduce a state-of-the-art youth recreation space, and improve accessibility features throughout the building.

The announcement marks a significant milestone for the community, which has long relied on the center as a hub for activities, programs, and support services. According to local officials, the planned upgrades will ensure the center can better serve the needs of residents for years to come.

The $2 million grant will be used to update outdated infrastructure, add a dedicated youth recreation area equipped with the latest resources, and improve inclusivity by enhancing accessibility features throughout the building.

Construction is scheduled to start this summer, with a projected completion date in late 2025. During the renovation period, programs and services will temporarily relocate to nearby facilities. The center's management assures residents that this short-term inconvenience will lead to long-term benefits.

Community members have expressed excitement about the improvements. “The Bethesda Community Center has been a cornerstone of our neighborhood for decades,” said longtime resident Maria Lopez. “These upgrades will make it even more valuable to families like mine.”

The grant is part of a broader initiative to invest in community infrastructure across the region. Local leaders hope this project will inspire similar efforts in other neighborhoods.

Stay tuned for updates as the Bethesda Community Center begins its exciting transformation.`,
  head_image_url:
    "https://www.greaterbethesdachamber.org/uploads/1/1/8/4/118438767/bethesda-metro-plaza_2_orig.jpg",
  category: "Local News",
  category_id: "local_news",
  read_time: 5,
  publish_date: new Date("2024-03-15"),
  update_date: new Date(), // Defaults to current date/time
};
