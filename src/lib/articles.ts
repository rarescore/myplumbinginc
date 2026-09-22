export type Article = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  category: string;
  read: string;
  image: string;
  alt: string;
  related: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "adu-cost-los-angeles-2026",
    title: "What an LA ADU actually costs in 2026",
    dek: "Not a national average. The number that moves is the sewer tap, the setback, and whether the unit has a real kitchen.",
    date: "September 2026",
    category: "ADUs",
    read: "6 min",
    image: "/photos/articles/adu-dusk-valley.jpg",
    alt: "Finished backyard ADU at dusk in the San Fernando Valley",
    related: "adu-contractor-los-angeles",
    sections: [
      {
        paragraphs: [
          "Search “ADU cost Los Angeles” and you get a range wide enough to be useless. The honest version: a permitted backyard unit in the Valley is a small house. It has a foundation, a wet wall, a roof, and a path through plan check. Paint is the cheap part.",
          "Owners who get surprised are usually surprised by the tap, not the tile.",
        ],
      },
      {
        heading: "Where the money actually goes",
        paragraphs: [
          "Utility tie-in, waterproofing, and inspection sequencing eat more of the bid than the Instagram finish. A studio with a kitchenette and a shower is a different animal than a one-bedroom with a full kitchen — because both drain, and one of them drains a lot.",
          "If the lot already has a clean sewer lateral with slope, you are in a better story than a pad that needs a new tap across the driveway.",
        ],
      },
      {
        heading: "A useful way to think about it",
        paragraphs: [
          "Price the wet rooms and the permit path first. Then pick finishes. Reversing that order is how a “simple ADU” becomes a second construction loan.",
          "We will tell you on the first visit if the lot wants an ADU or if a conversion is the smarter tool. That conversation is free. The surprise later is not.",
        ],
      },
    ],
  },
  {
    slug: "garage-conversion-vs-adu-los-angeles",
    title: "Garage conversion or ADU? The Valley decision",
    dek: "One reuses a box you already own. The other is a new building. Los Angeles treats them like different jobs — because they are.",
    date: "August 2026",
    category: "Conversions",
    read: "5 min",
    image: "/photos/articles/garage-glass.jpg",
    alt: "Los Angeles garage converted to a glass-front studio",
    related: "garage-conversions-los-angeles",
    sections: [
      {
        paragraphs: [
          "A garage conversion looks cheaper because the roof is already there. Sometimes it is. Sometimes the garage does not drain, does not insulate, and sits in a setback that will never take a bath.",
          "An ADU is a new permitted dwelling. It costs more because you are building a house in the backyard, not drywalling a parking stall.",
        ],
      },
      {
        heading: "When conversion wins",
        paragraphs: [
          "Office, studio, gym, guest room without a bath — conversions shine. You are buying insulation, egress, and electrical. You are not fighting gravity.",
        ],
      },
      {
        heading: "When the ADU is the honest answer",
        paragraphs: [
          "If someone will sleep there, cook there, and shower there, you need a dwelling. Forcing a bath into a garage that sits below the sewer is how you buy a pump, a callback, and a fight with inspection.",
          "We have talked owners out of the bath. They still have a quiet room. That is a win.",
        ],
      },
    ],
  },
  {
    slug: "bathroom-remodel-permit-los-angeles",
    title: "When a bathroom remodel needs a permit in LA",
    dek: "Swap a toilet, maybe not. Move a drain, yes. The line is not “cosmetic vs not.” It is whether you touched the wet wall.",
    date: "July 2026",
    category: "Baths",
    read: "5 min",
    image: "/photos/articles/bath-open.jpg",
    alt: "Bathroom remodel in progress with copper pipes and stacked tile",
    related: "bathroom-remodeling-los-angeles",
    sections: [
      {
        paragraphs: [
          "Los Angeles does not care that you bought nice tile. It cares if you moved the shower, opened the pan, or relocated a drain. Those are plumbing and waterproofing. Those get a permit.",
          "A like-for-like fixture swap in the same rough-in is a different conversation than a primary bath that grows a linear drain and a niche.",
        ],
      },
      {
        heading: "Why we permit the ones that should be",
        paragraphs: [
          "Unpermitted wet work is a gift to the next buyer’s inspector and a problem for your insurance. We would rather walk the job with the city than explain a pan failure in year six.",
          "If the layout stays and the trap stays, we will say so. If it does not, we will write it into the scope before anyone orders stone.",
        ],
      },
    ],
  },
  {
    slug: "kitchen-island-plumbing-overrun",
    title: "The island is why your kitchen bid jumps",
    dek: "Cabinets are not the surprise. An island sink and a dishwasher that were “undecided” on day one are.",
    date: "June 2026",
    category: "Kitchens",
    read: "5 min",
    image: "/photos/articles/kitchen-island.jpg",
    alt: "Kitchen island with stone counter and copper faucet",
    related: "kitchen-remodeling-los-angeles",
    sections: [
      {
        paragraphs: [
          "A kitchen is a plumbing project wearing millwork. The island is where that stops being a metaphor. Water in the middle of the room needs a plan before the slab, the subfloor, or the stone.",
          "Owners fall in love with a mood board, then add a sink “if we can.” That sentence is a change order.",
        ],
      },
      {
        heading: "Lock it before fabrication",
        paragraphs: [
          "Sink, gas, dishwasher, and the run to the island get decided on the site visit. Then cabinets. Then stone. Reverse that and you are cutting a $4,000 slab around a trap that moved two inches.",
          "If you want the island dry, say so. Dry islands are cheaper and honest. Wet islands are fine — they are just a different job.",
        ],
      },
    ],
  },
  {
    slug: "why-adus-fail-inspection",
    title: "Why backyard ADUs fail inspection",
    dek: "It is rarely the paint. It is slope, the stack, and a wet wall that was treated like decoration.",
    date: "May 2026",
    category: "ADUs",
    read: "6 min",
    image: "/photos/articles/wet-wall.jpg",
    alt: "Open framed wall with plumbing stack during ADU construction",
    related: "adu-contractor-los-angeles",
    sections: [
      {
        paragraphs: [
          "Failed ADU inspections in Los Angeles cluster around water. Wrong slope on the drain. A shower pan that does not drain. A tie-in that was guessed. Finish work that started before the city signed the rough.",
          "That is why a plumber-founded GC is not a branding gimmick on this work. The pretty room is the last 20%.",
        ],
      },
      {
        heading: "What we lock before framing closes",
        paragraphs: [
          "Utility path, waterproofing spec, and the inspection sequence. Walls open once. You do not recut a finished ADU because someone hoped the lateral was fine.",
          "If the lot cannot take the unit you pictured, we will say so on visit one — not at the final.",
        ],
      },
    ],
  },
  {
    slug: "adding-bathroom-1950s-valley-ranch",
    title: "Adding a bath to a 1950s Valley ranch",
    dek: "The house is a slab, a low roof, and a stack that was never meant to grow. The new bath has to respect all three.",
    date: "April 2026",
    category: "Additions",
    read: "6 min",
    image: "/photos/articles/valley-ranch.jpg",
    alt: "1950s San Fernando Valley ranch house in afternoon light",
    related: "bathroom-remodeling-los-angeles",
    sections: [
      {
        paragraphs: [
          "Postwar ranches in North Hills, Van Nuys, and Encino were built with one bath and a prayer. Adding a second is the most common “we’re staying” project we see.",
          "The constraint is not taste. It is where the existing drain lives, how thick the slab is, and whether a new wet room can fall to the lateral without a circus.",
        ],
      },
      {
        heading: "Hall bath vs stealing a bedroom corner",
        paragraphs: [
          "A hall bath that stacks near the original plumbing is cheaper than a primary suite carved out of a bedroom on the other side of the house. Distance is money. Gravity is not optional.",
          "We measure that on the visit. The mood board comes after the trap.",
        ],
      },
    ],
  },
  {
    slug: "how-long-home-addition-takes-valley",
    title: "How long a Valley addition really takes",
    dek: "Build time is not the whole clock. Plan check is. Anyone who quotes a finish date before the permit path is selling you a feeling.",
    date: "March 2026",
    category: "Additions",
    read: "5 min",
    image: "/photos/articles/addition-frame.jpg",
    alt: "Home addition framing attached to a stucco house",
    related: "home-additions-los-angeles",
    sections: [
      {
        paragraphs: [
          "A rear addition in the San Fernando Valley is a foundation, a roof tie-in, and often a new bath. The wood goes up fast once you are allowed to start. Getting allowed is the part owners underestimate.",
          "City of Los Angeles plan check, utility coordination, and inspection windows sit on the calendar whether the internet wants them to or not.",
        ],
      },
      {
        heading: "A honest sequence",
        paragraphs: [
          "Site visit. Written scope. Drawings. Plan check. Build. Punch. We do not start finish work against an unpermitted path.",
          "If you need a number for a lender, we can talk ranges after we have walked the joint between old roof and new. That joint is the leak if you rush it.",
        ],
      },
    ],
  },
  {
    slug: "cslb-b-license-or-five-trades",
    title: "One B license, or five phone numbers",
    dek: "A general building contractor is not a lead-gen network. It is one license, one scope, and one person who shows up when the wall is open.",
    date: "February 2026",
    category: "Process",
    read: "5 min",
    image: "/photos/articles/license-table.jpg",
    alt: "Contractor license and copper fitting on a job-site table",
    related: "general-contractor-los-angeles",
    sections: [
      {
        paragraphs: [
          "California’s B license covers the structure of a job that uses more than two unrelated trades. That is an ADU. That is a kitchen plus a bath. That is an addition.",
          "Hiring a tile guy, a plumber, a carpenter, and a “project manager” from Instagram is not the same thing. When the pan fails, you get four voicemails.",
        ],
      },
      {
        heading: "What to verify before you book",
        paragraphs: [
          "Look up the license on CSLB. Ours is 1120118. Classification B — General Building Contractor. Then walk a comparable job, or at least ask what lives behind the wall.",
          "Edgar is the project contact. You do not get a sales desk and a vanishing superintendent. That is the entire pitch, and it is also the work.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
