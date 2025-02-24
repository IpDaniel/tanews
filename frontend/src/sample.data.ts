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

export const sample_article_2: Article = {
  article_id: "2",
  author_id: "michael_chen", // Placeholder author ID
  text: `City planners are celebrating the completion of a network of dedicated bike lanes throughout the downtown area. The project, which aims to enhance safety and promote sustainable transportation, has already begun reshaping how residents navigate the bustling urban center.

The newly installed lanes extend across major downtown corridors, creating a connected and accessible pathway for cyclists. Designed with safety in mind, the bike lanes are clearly marked and separated from vehicle traffic by physical barriers in several high-traffic areas.

This effort is part of a broader initiative to reduce traffic congestion and carbon emissions while encouraging a healthier lifestyle among city residents. By providing a dedicated space for bicycles, planners aim to make cycling a viable alternative to driving for daily commutes and errands.

City officials have expressed optimism about the lanes' potential to transform urban mobility. “This is a step toward building a more sustainable and people-friendly downtown,” said Transportation Commissioner Lisa Carter. “We want everyone—whether they drive, bike, or walk—to feel safe and supported on our streets.”

Local businesses and residents are already noticing positive changes. “I’ve seen more people biking to work, and it’s definitely made the streets feel less chaotic,” said café owner Elena Rivera, whose shop is located along one of the newly renovated streets.

Community groups and environmental advocates have also applauded the city’s efforts. “This infrastructure shows that cities can prioritize both safety and sustainability,” said Tim Nguyen, a representative from the Urban Cycling Coalition.

Critics, however, have raised concerns about the reduction in available parking spots and potential challenges for delivery drivers. City officials have promised to monitor the impact and adjust as needed to balance the needs of all road users.

The bike lane project is expected to serve as a blueprint for other neighborhoods looking to adopt similar improvements. City planners hope this success will inspire further investments in sustainable urban transportation.

For now, residents are encouraged to explore the new lanes and experience firsthand how they are changing the rhythm of downtown traffic.`,
  head_image_url:
    "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp",
  category: "Urban Planning",
  category_id: "urban_planning",
  read_time: 4,
  publish_date: new Date("2024-03-14"),
  update_date: new Date(), // Defaults to current date/time
};
