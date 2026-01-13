export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProperties } from '@/lib/unified-feed-service';
import { getGolfCourseBySlug, getAllGolfSlugs, GOLF_COURSES, getGolfCoursesByRegion } from '@/lib/golf-courses';

// Generate static params for all golf course pages
export async function generateStaticParams() {
  return getAllGolfSlugs().map((slug) => ({ slug }));
}

// Generate metadata for each course
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = getGolfCourseBySlug(params.slug);
  if (!course) return { title: 'Course Not Found' };

  return {
    title: `${course.name} Properties | Golf Homes Near ${course.town} From €180k`,
    description: `Find properties near ${course.name} in ${course.town}. ${course.holes}-hole ${course.designer ? `course designed by ${course.designer}` : 'championship course'}. Frontline golf apartments, villas & townhouses. Year-round golf, 300+ days sunshine.`,
    keywords: `${course.name.toLowerCase()}, ${course.town.toLowerCase()} golf property, golf homes ${course.town.toLowerCase()}, frontline golf ${course.region.toLowerCase()}, costa blanca golf property`,
    openGraph: {
      title: `${course.name} | Golf Properties Costa Blanca`,
      description: `Properties near ${course.name}. ${course.holes} holes, par ${course.par}. Golf homes from €180,000.`,
      type: 'website',
    },
  };
}

// Course-specific data (green fees, stats, FAQs)
const COURSE_DATA: Record<string, {
  stats: { length?: string; slope?: string; rating?: string; difficulty: string };
  greenFees: { high: string; low: string; twilight: string; buggy: string; trolley: string; clubs: string };
  facilities: string[];
  propertyPrices: { type: string; range: string }[];
  faqs: { question: string; answer: string }[];
  extendedDescription: string;
  signatureHoles: string;
  bestFor: string[];
}> = {
  'la-finca': {
    stats: { length: '6,017m', slope: '126', rating: '71.5', difficulty: 'Medium' },
    greenFees: { high: '€75-85', low: '€55-65', twilight: '€45-55', buggy: '€35', trolley: '€5', clubs: '€25' },
    facilities: ['Driving Range', 'Putting Green', 'Chipping Area', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms', 'Golf Academy', 'Club Hire', 'Electric Buggies'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€180,000 - €250,000' },
      { type: '3-bed apartment', range: '€250,000 - €320,000' },
      { type: '3-bed townhouse', range: '€280,000 - €380,000' },
      { type: '3-bed villa', range: '€380,000 - €550,000' },
    ],
    faqs: [
      { question: 'How much is La Finca Golf membership?', answer: 'La Finca Golf offers various membership options. Annual unlimited play memberships typically range from €1,200-1,500 depending on age and category. Flexible membership cards (10 or 20 rounds) are also available from €550. Contact the club directly for current rates and special offers.' },
      { question: 'Is La Finca Golf difficult for beginners?', answer: 'La Finca is rated as medium difficulty, making it suitable for golfers of all levels. The course has wide fairways on many holes which are forgiving for beginners, while the strategic bunkering and water hazards provide challenge for experienced players. The excellent practice facilities also make it ideal for improving your game.' },
      { question: 'How far is La Finca Golf from Alicante Airport?', answer: 'La Finca Golf Resort is approximately 40km from Alicante-Elche Airport, which takes around 35-40 minutes by car via the AP-7 motorway. From Murcia-Corvera Airport, the distance is about 30km (25 minutes). Transfer services are available.' },
      { question: 'Can I buy property directly on La Finca Golf course?', answer: 'Yes! La Finca Golf Resort has several residential developments offering frontline golf properties. New build apartments with golf views start from around €180,000, with villas from €380,000. The Oasis Golf La Finca development by Contrimar offers modern apartments with pool and golf views.' },
      { question: 'What is the dress code at La Finca Golf?', answer: 'La Finca Golf has a smart casual dress code. Golf shoes with soft spikes are required on the course. Collared shirts are recommended, and denim/cargo shorts are generally not permitted on the course. The clubhouse restaurant has a relaxed dress code.' },
      { question: 'Does La Finca Golf have a driving range?', answer: 'Yes, La Finca has excellent practice facilities including a large driving range with covered bays, a putting green, and a short game practice area with bunkers. Golf lessons are available from PGA-qualified professionals at the on-site golf academy.' },
      { question: 'What other golf courses are near La Finca?', answer: 'La Finca is ideally located with several courses nearby: La Marquesa (5 mins), Vistabella (10 mins), Villamartín (15 mins), Las Ramblas (15 mins), and Campoamor (15 mins). This makes it perfect for golfers wanting variety.' },
      { question: 'Is La Finca Golf busy?', answer: 'La Finca is popular but rarely overcrowded. Peak times are mornings during winter (Nov-Mar) when visiting golfers escape Northern European weather. Summer mornings can also be busy. Booking 2-3 days ahead is recommended in high season. Twilight rounds are usually readily available.' },
    ],
    extendedDescription: `La Finca Golf Resort stands as one of Costa Blanca South's most popular golfing destinations, offering the perfect blend of challenging golf, excellent facilities, and an established residential community. Designed by Pepe Gancedo and opened in 2002, the course has matured beautifully with tree-lined fairways and strategic water features creating an engaging test for all abilities.

The course layout winds through the Algorfa countryside with the Sierra de Callosa mountains providing a stunning backdrop. At 6,017 meters from the back tees, it's not overly long but demands accuracy—wayward shots are punished by well-positioned bunkers and several lakes that come into play on key holes. The greens are typically maintained in excellent condition with subtle breaks that reward those who read them correctly.

What sets La Finca apart is its atmosphere. The resort has developed into a genuine golf community where residents and visitors mix easily. The clubhouse terrace is a popular spot for post-round drinks, overlooking the 18th green and practice putting area. The restaurant serves excellent Spanish and international cuisine at reasonable prices.

For property buyers, La Finca offers something increasingly rare: the ability to buy new build properties with genuine frontline golf positions. Developments like Oasis Golf La Finca by Contrimar offer modern apartments with course views and resort-style amenities, all within walking distance of the first tee. The rental potential is strong, with golf tourism creating year-round demand.`,
    signatureHoles: `The signature hole at La Finca is the par-3 8th, requiring a precise tee shot over water to a well-protected green with bunkers front-left and right. The 15th is another highlight—a dogleg par 4 with water down the left side and a two-tiered green that punishes poorly judged approach shots. The closing stretch from 16-18 provides an exciting finish with risk-reward decisions on each hole.`,
    bestFor: ['Golfers seeking good value', 'Property investors', 'Families', 'Social golfers', 'Those wanting new build options'],
  },
  'villamartin': {
    stats: { length: '5,663m', slope: '121', rating: '69.2', difficulty: 'Medium' },
    greenFees: { high: '€80-95', low: '€60-70', twilight: '€50-60', buggy: '€40', trolley: '€5', clubs: '€30' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Famous Plaza with Restaurants', 'Locker Rooms', 'Golf Academy', 'Club Hire'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€150,000 - €220,000' },
      { type: '3-bed apartment', range: '€200,000 - €280,000' },
      { type: '3-bed townhouse', range: '€250,000 - €350,000' },
      { type: '3-bed villa', range: '€350,000 - €600,000' },
    ],
    faqs: [
      { question: 'What is Villamartín Plaza famous for?', answer: 'Villamartín Plaza is the social heart of the golf community—a charming square surrounded by restaurants, bars, and cafes that has become one of Costa Blanca\'s most popular meeting spots. The atmosphere is particularly vibrant on weekend evenings and during golf tournaments. It\'s a key reason many buyers choose to live in this area.' },
      { question: 'How much is Villamartín Golf membership?', answer: 'Villamartín Golf Club offers memberships from approximately €1,400-1,800 per year for unlimited play. They also offer flexible options including 10-round cards. Senior and couple discounts are available. Contact the club for current pricing.' },
      { question: 'Is Villamartín Golf part of the same group as Las Ramblas and Campoamor?', answer: 'Yes, all three courses are managed by the same group, allowing golfers to book across all three venues. Multi-course packages offer excellent value, and membership at one course often provides discounts at the others.' },
      { question: 'How far is Villamartín from the beach?', answer: 'Villamartín is approximately 5km from the nearest beaches at La Zenia and Cabo Roig, around 8-10 minutes by car. The famous La Zenia Boulevard shopping center is just 5 minutes away.' },
      { question: 'What is the best time to play Villamartín?', answer: 'Spring (March-May) and autumn (September-November) offer ideal conditions. Winter is popular with visiting golfers but the course is well-managed to avoid overcrowding. Summer afternoons with twilight rates offer excellent value and pleasant evening temperatures.' },
      { question: 'Is Villamartín good for beginners?', answer: 'Villamartín is considered moderately challenging. While not the easiest course for complete beginners, it\'s playable for improving golfers. The club offers excellent teaching facilities and PGA-qualified instructors.' },
      { question: 'What properties are available near Villamartín?', answer: 'The Villamartín area has a mature property market with options from resale apartments from €150,000 to luxury villas over €600,000. The nearby Blue Lagoon and El Galan urbanizations also offer good value. New build options are more limited than at La Finca.' },
      { question: 'How far is Villamartín from Alicante Airport?', answer: 'Villamartín is approximately 50km from Alicante Airport, taking around 40-45 minutes via the AP-7 motorway. From Murcia-Corvera Airport, it\'s about 35km (30 minutes).' },
    ],
    extendedDescription: `Villamartín Golf Club is perhaps the most famous name in Costa Blanca South golf, not just for its excellent 18-hole course but for the vibrant community that has grown around it. Since opening in 1972, Villamartín has been the beating heart of expat golf culture in the region, with the famous Plaza becoming an essential part of the Costa Blanca lifestyle experience.

The course itself is a Putnam & Buther design that has stood the test of time. At 5,663 meters it's not overly long, but the tight, tree-lined fairways and small, well-protected greens demand accuracy. Water comes into play on several holes, including the challenging 18th where the green is guarded by a lake. The course conditioning is consistently excellent, with greens running true and fairways well-maintained year-round.

What truly distinguishes Villamartín is the atmosphere. The famous Plaza, surrounded by restaurants, bars, and shops, creates a social hub that brings golfers and residents together. After your round, the tradition is drinks on the terrace overlooking the 18th green, followed by dinner at one of the many excellent restaurants. Weekend evenings see the Plaza come alive with families, golfers, and visitors enjoying the quintessential Costa Blanca lifestyle.

For property buyers, Villamartín offers an established community with proven infrastructure. While new build options are more limited than at La Finca, the resale market is active with well-maintained properties at various price points. The proximity to La Zenia Boulevard, beaches, and healthcare facilities adds practical convenience to the golf lifestyle appeal.`,
    signatureHoles: `The par-4 18th is Villamartín's signature hole and a memorable finish to any round. The drive must avoid trees on both sides, leaving an approach shot over water to a green that slopes towards the lake. Many rounds have been won and lost on this hole. The par-3 3rd is another standout, playing over a valley to an elevated green with beautiful views.`,
    bestFor: ['Social golfers', 'Established community seekers', 'Restaurant & nightlife lovers', 'Those wanting proven rental market', 'Couples and retirees'],
  },
  'las-ramblas': {
    stats: { length: '5,921m', slope: '130', rating: '71.8', difficulty: 'Challenging' },
    greenFees: { high: '€75-90', low: '€55-65', twilight: '€45-55', buggy: '€35', trolley: '€5', clubs: '€25' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms', 'Golf Academy'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€160,000 - €230,000' },
      { type: '3-bed apartment', range: '€220,000 - €300,000' },
      { type: '3-bed townhouse', range: '€280,000 - €380,000' },
      { type: '3-bed villa', range: '€400,000 - €650,000' },
    ],
    faqs: [
      { question: 'Is Las Ramblas Golf difficult?', answer: 'Las Ramblas is considered the most challenging of the Orihuela Costa courses due to its dramatic elevation changes and narrow fairways. The slope rating of 130 reflects this difficulty. Mid-to-high handicappers should consider playing from the forward tees for an enjoyable round.' },
      { question: 'What are the views like at Las Ramblas?', answer: 'Las Ramblas offers arguably the best views of any Costa Blanca South course. The elevated positions provide panoramic vistas across the Mediterranean, the salt lakes, and the surrounding mountains. Several holes offer stunning photo opportunities.' },
      { question: 'How physically demanding is Las Ramblas?', answer: 'Las Ramblas is the most physically demanding course in the area due to significant elevation changes. A buggy is highly recommended, especially in summer or for those with mobility concerns. The walk between some greens and tees is steep.' },
      { question: 'What properties are available near Las Ramblas?', answer: 'Las Ramblas has a residential community with properties ranging from apartments to luxury villas. Many properties enjoy elevated positions with spectacular views. Prices tend to be slightly higher than Villamartín due to the views and lower density development.' },
      { question: 'Is Las Ramblas suitable for beginners?', answer: 'Las Ramblas is not recommended for beginners. The combination of elevation changes, narrow fairways, and challenging greens can be frustrating for high handicappers. We\'d suggest starting at La Finca or La Marquesa before tackling Las Ramblas.' },
      { question: 'What is the signature hole at Las Ramblas?', answer: 'The par-3 7th is Las Ramblas\' most photographed hole—a dramatic downhill shot to a green surrounded by rocks and vegetation with the Mediterranean as a backdrop. The par-4 15th also offers stunning views across the salt lakes.' },
      { question: 'Can I play Las Ramblas, Villamartín, and Campoamor together?', answer: 'Yes, all three courses are under the same management and multi-course packages are available. This is a popular option for golf groups visiting the area, offering three different experiences over consecutive days.' },
      { question: 'How far is Las Ramblas from the beach?', answer: 'Las Ramblas is approximately 6km from the beaches at Cabo Roig and Campoamor, around 10 minutes by car. Despite the elevated position, you\'re still very close to the coast.' },
    ],
    extendedDescription: `Las Ramblas Golf Course offers the most visually dramatic golfing experience in Costa Blanca South, with elevation changes that set it apart from the flatter courses in the region. Built into the hillside overlooking the Mediterranean and the famous pink salt lakes, every round here is accompanied by spectacular views that make even poor shots easier to accept.

Designed and opened in 1991, the course makes full use of the natural terrain. Holes climb and plunge through the landscape, with the par-3 7th offering one of the most photographed golf shots on the coast—a dramatic downhill hole with the sea stretching to the horizon beyond the green. The layout demands strategic thinking; the elevation changes affect club selection significantly, and many fairways are narrower than they appear.

The course is challenging but fair. At 5,921 meters with a slope rating of 130, it demands respect from all players. Low handicappers will relish the test, while higher handicappers should consider the forward tees or the many forgiving bailout areas that thoughtful design provides. What Las Ramblas lacks in length it makes up for in character—no two holes feel alike.

For property buyers, Las Ramblas offers something unique: homes with views that would cost significantly more in other Costa Blanca locations. The residential areas benefit from the elevated position, with many properties enjoying panoramic Mediterranean vistas. The community is smaller and more exclusive than Villamartín, appealing to those seeking a quieter environment with outstanding natural beauty.`,
    signatureHoles: `The par-3 7th is undoubtedly the signature hole—playing dramatically downhill to a green perched above the Mediterranean with nothing but sea and sky beyond. Bring your camera. The 15th offers equally stunning views across the salt lakes to the mountains, while the closing holes provide a challenging finish with elevation changes and water hazards testing your closing skills.`,
    bestFor: ['Experienced golfers', 'View seekers', 'Photographers', 'Those wanting exclusive location', 'Mountain/sea view property buyers'],
  },
  'campoamor': {
    stats: { length: '5,737m', slope: '123', rating: '70.1', difficulty: 'Medium' },
    greenFees: { high: '€70-85', low: '€50-60', twilight: '€40-50', buggy: '€35', trolley: '€5', clubs: '€25' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant', 'Locker Rooms', 'Hotel'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€170,000 - €240,000' },
      { type: '3-bed apartment', range: '€230,000 - €310,000' },
      { type: '3-bed townhouse', range: '€290,000 - €400,000' },
      { type: '3-bed villa', range: '€420,000 - €700,000' },
    ],
    faqs: [
      { question: 'Who designed Campoamor Golf?', answer: 'Campoamor was designed by José María Olazábal, the two-time Masters champion from Spain. His design philosophy emphasizes strategy and shot-making over raw length, creating a course that rewards thoughtful play.' },
      { question: 'Does Campoamor have a hotel?', answer: 'Yes, Campoamor has an on-site hotel, making it ideal for golf breaks and visitors. The hotel offers comfortable accommodation with direct access to the course and practice facilities.' },
      { question: 'How does Campoamor compare to Villamartín?', answer: 'Campoamor offers a more peaceful setting compared to the bustling Villamartín. The course is slightly shorter but equally challenging, with more mature trees and a parkland feel. It\'s part of the same management group, so combination deals are available.' },
      { question: 'Is Campoamor suitable for all levels?', answer: 'Yes, Campoamor is considered one of the more accessible courses in the area. While it has strategic challenges, wider fairways and manageable length make it enjoyable for golfers of all abilities.' },
      { question: 'What properties are near Campoamor Golf?', answer: 'Campoamor has a prestigious residential area with properties ranging from apartments to substantial villas. The area has a slightly higher-end feel than some neighboring developments, reflected in property prices.' },
      { question: 'How far is Campoamor from the beach?', answer: 'Campoamor Golf is just 2km from the beautiful Campoamor beach, one of the quieter beaches in the Orihuela Costa area. Cabo Roig beach is also just 3km away.' },
      { question: 'Is Campoamor busy?', answer: 'Campoamor is generally less crowded than Villamartín, making it easier to get tee times. The hotel guests have some priority but the course is rarely overcrowded.' },
      { question: 'What is the best hole at Campoamor?', answer: 'The par-4 9th is considered the signature hole, requiring a precise drive and approach to a green protected by water and bunkers. The closing holes also provide an exciting finish to the round.' },
    ],
    extendedDescription: `Campoamor Golf, designed by two-time Masters champion José María Olazábal, brings championship pedigree to Costa Blanca South. The course reflects Olazábal's playing philosophy—emphasizing strategy, accuracy, and course management over brute force. It's a thinking golfer's course where the smart play is often rewarded over the aggressive option.

The layout meanders through mature pine trees and Mediterranean vegetation, creating a parkland atmosphere that feels more established than some newer courses in the area. Water features are used strategically rather than punitively, coming into play on key holes but offering bail-out options for those who respect the hazards. The greens are typically excellent, with subtle borrows that reward players who take time to read their putts.

What distinguishes Campoamor is its peaceful atmosphere. Unlike the social buzz of Villamartín or the challenging terrain of Las Ramblas, Campoamor offers a more traditional golf experience focused purely on the game. The on-site hotel adds convenience for golf groups, while the course's location just 2km from Campoamor beach means families can easily combine golf and beach holidays.

For property buyers, Campoamor represents one of the more prestigious addresses in Orihuela Costa. The residential areas have maintained high standards, with well-kept gardens and quality construction throughout. Properties here command slightly higher prices than equivalent homes at Villamartín or La Finca, reflecting the area's reputation and beach proximity.`,
    signatureHoles: `The par-4 9th hole captures Olazábal's design philosophy—a strategic dogleg where the aggressive line brings water into play but shortens the approach, while the safe play leaves a longer but unobstructed shot to the green. The finishing stretch from 16-18 provides excellent drama, with water and bunkers creating risk-reward decisions on each hole.`,
    bestFor: ['Strategic players', 'Those seeking peaceful golf', 'Golf break visitors (hotel)', 'Families (beach proximity)', 'Higher-end property seekers'],
  },
  'vistabella': {
    stats: { length: '5,635m', slope: '118', rating: '68.9', difficulty: 'Easy-Medium' },
    greenFees: { high: '€55-65', low: '€40-50', twilight: '€30-40', buggy: '€30', trolley: '€4', clubs: '€20' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms', 'Golf Academy', 'Halfway House'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€140,000 - €200,000' },
      { type: '3-bed apartment', range: '€180,000 - €250,000' },
      { type: '3-bed townhouse', range: '€230,000 - €320,000' },
      { type: '3-bed villa', range: '€320,000 - €480,000' },
    ],
    faqs: [
      { question: 'Is Vistabella good for beginners?', answer: 'Yes, Vistabella is considered one of the best courses for beginners in Costa Blanca. Wider fairways, forgiving rough, and excellent practice facilities create an encouraging environment for those new to golf or building confidence.' },
      { question: 'How much are green fees at Vistabella?', answer: 'Vistabella offers excellent value with green fees ranging from €40-65 depending on season. Twilight rates from €30 make it very accessible. Annual memberships are around €950, excellent value for regular golfers.' },
      { question: 'Does Vistabella have a golf academy?', answer: 'Yes, Vistabella has an excellent golf academy with PGA-qualified professionals offering individual and group lessons. The facilities include a driving range, short game area, and practice putting greens—ideal for beginners and those wanting to improve.' },
      { question: 'What properties are available at Vistabella?', answer: 'Vistabella Golf Resort has a residential community with new build and resale properties. It\'s one of the more affordable golf locations, with apartments from around €140,000. New developments continue to add modern options.' },
      { question: 'How far is Vistabella from the beach?', answer: 'Vistabella is approximately 12km inland from the coast, about 15 minutes to the nearest beaches at Guardamar del Segura. This inland location keeps property prices lower while still offering easy beach access.' },
      { question: 'Is Vistabella suitable for experienced golfers?', answer: 'While Vistabella is beginner-friendly, experienced golfers can still enjoy the course. The layout has enough variety and challenge to test all abilities, especially when played from the back tees. The excellent conditioning makes it enjoyable regardless of skill level.' },
      { question: 'What other courses are near Vistabella?', answer: 'Vistabella is centrally located for Costa Blanca South golf: La Marquesa (5 mins), La Finca (10 mins), Villamartín (20 mins), and Las Ramblas (20 mins). This makes it ideal for golfers wanting variety.' },
      { question: 'Does Vistabella have a halfway house?', answer: 'Yes, Vistabella has a halfway house between the 9th and 10th holes where you can grab drinks and snacks. This is a nice touch that adds to the relaxed, friendly atmosphere of the club.' },
    ],
    extendedDescription: `Vistabella Golf has carved out a well-deserved reputation as Costa Blanca's most welcoming golf course, offering a friendly environment where beginners feel encouraged and experienced golfers enjoy excellent facilities at outstanding value. The course, while not the most challenging in the region, delivers a consistently enjoyable experience with excellent conditioning throughout the year.

The layout is designed to build confidence. Wider fairways give players room to hit their drives, while the rough is kept playable rather than punishing. This doesn't mean Vistabella is easy—the course has teeth when played from the back tees, with strategic bunkering and subtle green complexes that reward good approach play. But the overall design philosophy is inclusive, making golf fun for everyone.

The practice facilities at Vistabella are among the best in the area. The driving range, putting greens, and short game practice areas see constant use by golfers looking to improve. The golf academy staffed by PGA professionals offers lessons for all levels, from complete beginners to experienced players fine-tuning their technique. This focus on development has created a genuine golf community feeling.

For property buyers, Vistabella offers the best value frontline golf living in Costa Blanca South. The inland location keeps prices lower than coastal developments, but you're still only 15 minutes from beautiful beaches. New build developments continue to add modern housing options, while the established community ensures good infrastructure and services.`,
    signatureHoles: `Vistabella's most memorable hole is the par-3 12th, playing over water to a well-protected green with views across the course. The closing par-5 18th offers a risk-reward finish where longer hitters can reach in two but must contend with water protecting the green. Both holes exemplify Vistabella's approach: challenging but fair.`,
    bestFor: ['Beginners', 'Improving golfers', 'Value seekers', 'Golf academy students', 'Budget-conscious property buyers'],
  },
  'la-marquesa': {
    stats: { length: '5,465m', slope: '115', rating: '67.8', difficulty: 'Easy-Medium' },
    greenFees: { high: '€50-60', low: '€35-45', twilight: '€25-35', buggy: '€30', trolley: '€4', clubs: '€20' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€120,000 - €170,000' },
      { type: '3-bed apartment', range: '€160,000 - €220,000' },
      { type: '3-bed townhouse', range: '€200,000 - €280,000' },
      { type: '3-bed villa', range: '€280,000 - €400,000' },
    ],
    faqs: [
      { question: 'Is La Marquesa the cheapest golf course in Costa Blanca?', answer: 'La Marquesa offers some of the best value green fees in Costa Blanca, with rates from €35-60. Combined with good course conditioning and a friendly atmosphere, it represents outstanding value for money.' },
      { question: 'Is La Marquesa suitable for beginners?', answer: 'Absolutely. La Marquesa is one of the most beginner-friendly courses in Costa Blanca. Shorter overall length, forgiving fairways, and a relaxed atmosphere make it perfect for those new to golf or building confidence.' },
      { question: 'What is the clubhouse like at La Marquesa?', answer: 'La Marquesa has a welcoming clubhouse with a restaurant serving Spanish and international food at reasonable prices. It has a friendly, unpretentious atmosphere popular with locals and visitors alike.' },
      { question: 'How far is La Marquesa from other golf courses?', answer: 'La Marquesa is ideally located: Vistabella (5 mins), La Finca (10 mins), Villamartín (15 mins). This makes it easy to play multiple courses during a golf trip.' },
      { question: 'What properties are near La Marquesa?', answer: 'The Ciudad Quesada area near La Marquesa offers some of the most affordable property in Costa Blanca, with apartments from around €120,000. The established community has good amenities, shops, and restaurants.' },
      { question: 'Is La Marquesa crowded?', answer: 'La Marquesa is generally less crowded than the more famous courses, making it easier to get tee times and enjoy a relaxed pace of play. It\'s a popular choice for regular golfers who value uncrowded fairways.' },
      { question: 'Does La Marquesa have a driving range?', answer: 'Yes, La Marquesa has a driving range and practice facilities. While not as extensive as some larger clubs, they\'re adequate for warming up or practicing.' },
      { question: 'How long does a round take at La Marquesa?', answer: 'Rounds at La Marquesa typically take 4-4.5 hours. The shorter course length and generally good pace of play mean you\'re not waiting on every tee. It\'s good for those who don\'t want to spend all day on the course.' },
    ],
    extendedDescription: `La Marquesa Golf has earned its reputation as the "golfer's golf course" of Costa Blanca South—unpretentious, excellent value, and focused purely on delivering an enjoyable round of golf. While it may lack the prestige of Villamartín or the drama of Las Ramblas, La Marquesa excels at what matters most: being a fun place to play golf regularly without breaking the bank.

The course layout is compact but cleverly designed, making full use of available space to create varied and interesting holes. At 5,465 meters, it's shorter than most, but this works in its favor—rounds are quicker, the course is accessible to all abilities, and there's less walking between holes. The par-3s are particularly well-crafted, each offering a different challenge.

The atmosphere at La Marquesa is refreshingly relaxed. There's no pretension here—just golfers enjoying their game. The clubhouse restaurant serves hearty food at fair prices, and it's common to see players lingering over post-round beers discussing their rounds. This unpretentious character has made La Marquesa a local favorite, with many regulars who play here weekly.

For property buyers, the Ciudad Quesada area around La Marquesa offers exceptional value. This established residential area has good infrastructure, shops, restaurants, and healthcare facilities. Property prices are among the lowest in the golf communities, making it attractive for budget-conscious buyers who still want the golf lifestyle.`,
    signatureHoles: `La Marquesa doesn't have a famous signature hole, but the par-3 5th over water is a favorite among regulars. The closing holes provide a good test to finish your round, and the overall variety of the par-3s is often praised—each requires a different shape of shot and club selection.`,
    bestFor: ['Budget-conscious golfers', 'Beginners', 'Regular players wanting value', 'Those seeking unpretentious atmosphere', 'Entry-level property buyers'],
  },
  'lo-romero': {
    stats: { length: '6,280m', slope: '131', rating: '72.4', difficulty: 'Challenging' },
    greenFees: { high: '€65-80', low: '€45-55', twilight: '€35-45', buggy: '€35', trolley: '€5', clubs: '€25' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms', 'Academy'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€150,000 - €210,000' },
      { type: '3-bed apartment', range: '€200,000 - €280,000' },
      { type: '3-bed townhouse', range: '€260,000 - €360,000' },
      { type: '3-bed villa', range: '€380,000 - €550,000' },
    ],
    faqs: [
      { question: 'Is Lo Romero difficult?', answer: 'Lo Romero is one of the longer and more challenging courses in Costa Blanca South, with a slope rating of 131. At 6,280 meters, it demands good length off the tee. Lower handicappers will enjoy the challenge, while higher handicappers should consider forward tees.' },
      { question: 'How far is Lo Romero from Murcia Airport?', answer: 'Lo Romero is the closest Costa Blanca course to Murcia-Corvera Airport, just 20 minutes away. This makes it convenient for golfers flying into Murcia rather than Alicante.' },
      { question: 'What makes Lo Romero different from other courses?', answer: 'Lo Romero offers a longer, more modern design compared to the classic Orihuela Costa courses. It suits players who hit the ball far and want a championship-style challenge. The conditioning is typically excellent.' },
      { question: 'Are there properties at Lo Romero?', answer: 'Yes, Lo Romero Golf Resort has residential developments with apartments, townhouses, and villas. It\'s newer than Villamartín or Campoamor, so more modern housing options are available.' },
      { question: 'Does Lo Romero host tournaments?', answer: 'Yes, Lo Romero regularly hosts regional and national tournaments. Its championship layout and excellent facilities make it suitable for competitive golf events.' },
      { question: 'Is Lo Romero good for beginners?', answer: 'Lo Romero is not recommended for beginners due to its length and difficulty. We\'d suggest starting at La Marquesa or Vistabella before attempting Lo Romero.' },
      { question: 'What are the facilities like at Lo Romero?', answer: 'Lo Romero has modern facilities including a large driving range, practice areas, well-stocked pro shop, and a contemporary clubhouse with restaurant and bar offering views over the course.' },
      { question: 'How does Lo Romero compare to La Finca?', answer: 'Lo Romero is longer and more challenging than La Finca, appealing to lower handicappers. La Finca has a more established community and is more accessible to average golfers. Both offer good property options.' },
    ],
    extendedDescription: `Lo Romero Golf Club represents the new generation of Costa Blanca golf—a modern, championship-length course designed to challenge better players while offering excellent facilities throughout. Opened more recently than the classic Orihuela Costa courses, Lo Romero brings a contemporary approach to golf in the region.

At 6,280 meters, Lo Romero is significantly longer than most Costa Blanca South courses and plays to its full length. The slope rating of 131 confirms what players experience on the course: this is a serious test of golf that rewards power combined with precision. The wide fairways invite aggressive driving, but subtle contouring and strategic bunkering punish wayward shots.

The course is immaculately maintained, with greens that roll true and fairways that provide excellent lies. Modern irrigation and drainage systems mean the course plays consistently well year-round, even after winter rains. The design aesthetic is American-style target golf, with clearly defined landing areas and risk-reward options on many holes.

For property buyers, Lo Romero offers modern developments with contemporary design and specifications. The resort is newer than Villamartín or Campoamor, meaning homes are built to current standards with modern amenities. The proximity to Murcia Airport is a practical advantage for those flying in regularly.`,
    signatureHoles: `The par-5 9th is Lo Romero's standout hole—a long three-shotter that requires strategic thinking on every shot. The back nine opener, a sharp dogleg par-4, demands a precisely placed drive. The closing stretch provides championship drama with water hazards and elevation changes testing players coming down the final fairways.`,
    bestFor: ['Low handicappers', 'Long hitters', 'Tournament players', 'Modern facility seekers', 'Murcia Airport arrivals'],
  },
  'oliva-nova': {
    stats: { length: '6,297m', slope: '133', rating: '72.8', difficulty: 'Challenging' },
    greenFees: { high: '€90-110', low: '€70-85', twilight: '€55-70', buggy: '€45', trolley: '€6', clubs: '€35' },
    facilities: ['Driving Range', 'Putting Green', 'Short Game Area', 'Pro Shop', 'Clubhouse Restaurant', 'Golf Academy', '5-Star Hotel', 'Spa', 'Beach Club'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€250,000 - €380,000' },
      { type: '3-bed apartment', range: '€350,000 - €500,000' },
      { type: '3-bed townhouse', range: '€450,000 - €650,000' },
      { type: '3-bed villa', range: '€650,000 - €1,200,000' },
    ],
    faqs: [
      { question: 'Who designed Oliva Nova Golf?', answer: 'Oliva Nova was designed by Severiano Ballesteros, the legendary Spanish golfer and three-time Open Championship winner. Opened in 1995, it\'s considered one of his finest designs and has hosted European Tour events.' },
      { question: 'Does Oliva Nova host professional tournaments?', answer: 'Yes, Oliva Nova has hosted several European Tour and European Seniors Tour events. The course is maintained to tournament standards year-round, ensuring exceptional conditioning for all visitors.' },
      { question: 'How difficult is Oliva Nova?', answer: 'Oliva Nova is a challenging championship course with a slope of 133. At 6,297 meters with strategic water hazards and well-protected greens, it demands a complete game. Average golfers should use appropriate tees to enjoy the experience.' },
      { question: 'What facilities are at Oliva Nova?', answer: 'Oliva Nova is a full resort with 5-star hotel, spa, beach club, multiple restaurants, and one of the best practice facilities in Spain. It\'s a complete golf destination, not just a course.' },
      { question: 'How far is Oliva Nova from Valencia?', answer: 'Oliva Nova is approximately 75km south of Valencia Airport, about 50 minutes by car. It\'s also 90 minutes from Alicante Airport. The resort\'s coastal location offers beautiful beach access.' },
      { question: 'What are property prices at Oliva Nova?', answer: 'Oliva Nova is one of Costa Blanca\'s most prestigious addresses, with property prices reflecting this. Apartments start around €250,000, with villas reaching over €1 million. It\'s a premium market for discerning buyers.' },
      { question: 'Is Oliva Nova suitable for families?', answer: 'Yes, Oliva Nova is excellent for families. The beach club provides activities for all ages, and the resort atmosphere means there\'s plenty to do beyond golf. The 5-star hotel offers family-friendly accommodation.' },
      { question: 'What is the signature hole at Oliva Nova?', answer: 'The par-3 8th, playing over water to an island green, is the most famous hole and features on many \'best holes in Spain\' lists. The par-5 18th with its dramatic water approach is also a memorable finishing hole.' },
    ],
    extendedDescription: `Oliva Nova Golf stands as the crown jewel of Costa Blanca golf—a Severiano Ballesteros masterpiece that consistently ranks among Spain's finest courses. When Seve created Oliva Nova in 1995, he crafted a layout that reflects his playing philosophy: strategic, dramatic, and always fair to those who think their way around the course.

The course layout takes full advantage of its coastal setting, with Mediterranean views and sea breezes adding to the experience. Seve's design incorporates water on numerous holes, but never unfairly—there are always safe options for those who respect the hazards. The greens are large and subtly contoured, rewarding precise iron play and intelligent green reading.

What elevates Oliva Nova beyond just a golf course is the complete resort experience. The 5-star hotel provides luxury accommodation, while the spa offers post-round relaxation. The beach club gives families an alternative to golf, and multiple dining options cater to all tastes. The practice facilities are extensive, making Oliva Nova ideal for serious golfers looking to improve.

For property buyers, Oliva Nova represents the premium end of Costa Blanca real estate. The combination of championship golf, beach access, and resort facilities creates a lifestyle that commands premium prices. Properties here offer excellent rental potential to discerning visitors seeking luxury golf experiences.`,
    signatureHoles: `The par-3 8th is Oliva Nova's most iconic hole—a dramatic shot over water to an island green that requires precision and nerve. It's appeared on countless "best holes in Spain" lists. The par-5 18th provides a fitting finale, with water protecting the green and demanding a thoughtful approach shot to close your round in style.`,
    bestFor: ['Championship golf seekers', 'Resort lifestyle', 'Luxury property buyers', 'Families wanting activities', 'Serious golfers'],
  },
  'la-sella': {
    stats: { length: '6,138m', slope: '128', rating: '71.5', difficulty: 'Challenging' },
    greenFees: { high: '€80-100', low: '€60-75', twilight: '€50-60', buggy: '€40', trolley: '€5', clubs: '€30' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms', 'Golf Academy', 'Hotel', 'Tennis Courts', 'Spa'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€220,000 - €320,000' },
      { type: '3-bed apartment', range: '€300,000 - €450,000' },
      { type: '3-bed townhouse', range: '€400,000 - €600,000' },
      { type: '3-bed villa', range: '€600,000 - €1,000,000' },
    ],
    faqs: [
      { question: 'Who designed La Sella Golf?', answer: 'La Sella was designed by José María Olazábal, the two-time Masters champion from Spain. His design showcases the natural beauty of the Dénia hills while creating a fair but challenging test of golf.' },
      { question: 'How difficult is La Sella?', answer: 'La Sella is a challenging course with significant elevation changes. The slope rating of 128 and the hillside terrain make it a test for all levels. Buggies are recommended due to the terrain.' },
      { question: 'What are the views like at La Sella?', answer: 'La Sella offers stunning views of the Montgó mountain, the Mediterranean, and the surrounding orange groves. It\'s one of the most scenic courses on the Costa Blanca, with panoramic vistas from many holes.' },
      { question: 'Is La Sella near the beach?', answer: 'La Sella is approximately 10km inland from Dénia\'s beaches, about 15 minutes by car. The Dénia coastline offers some of Costa Blanca North\'s finest beaches and marina facilities.' },
      { question: 'What facilities are at La Sella?', answer: 'La Sella is a full resort with hotel, spa, tennis courts, and swimming pools. The practice facilities are excellent, and the clubhouse offers quality dining with mountain views.' },
      { question: 'What properties are available at La Sella?', answer: 'La Sella Golf Resort has an established residential community with apartments, townhouses, and villas. Property prices are higher than Costa Blanca South, reflecting the prestigious North location.' },
      { question: 'Is La Sella suitable for beginners?', answer: 'La Sella is more suited to intermediate and advanced golfers due to its challenging terrain. Beginners might find the elevation changes and course length demanding. The resort does offer excellent teaching facilities.' },
      { question: 'How far is La Sella from Alicante Airport?', answer: 'La Sella is approximately 90km from Alicante Airport, about 1 hour 15 minutes by car via the AP-7. Valencia Airport is about 90 minutes away.' },
    ],
    extendedDescription: `La Sella Golf Resort, designed by Masters champion José María Olazábal, occupies one of Costa Blanca North's most spectacular settings. Built into the foothills of the Montgó mountain near Dénia, the course combines championship-quality golf with breathtaking views across the valley to the Mediterranean and beyond.

Olazábal's design philosophy emphasizes strategy and shot-making, and La Sella exemplifies this approach. The hillside terrain creates dramatic elevation changes that affect club selection on nearly every shot. Water features are used strategically, coming into play on key holes without being punitive. The greens are excellent—true, consistent, and featuring the subtle breaks that reward those who read them carefully.

The resort facilities extend well beyond golf. The on-site hotel provides comfortable accommodation for golf breaks, while the spa offers relaxation after a challenging round. Tennis courts and swimming pools cater to non-golfers or those wanting variety. The clubhouse restaurant serves excellent cuisine with views across the course to the mountains.

For property buyers, La Sella offers a prestigious address in Costa Blanca North. The residential community has matured over the years, with well-maintained properties in a beautiful natural setting. The combination of mountain location, proximity to Dénia's beaches and marina, and championship golf creates a lifestyle appealing to discerning buyers.`,
    signatureHoles: `The par-3 7th plays from an elevated tee to a green surrounded by bunkers, with the Montgó mountain providing a dramatic backdrop. The par-5 15th is another standout, requiring strategic thinking through a tree-lined valley. Every hole at La Sella seems to offer a different view, making it one of the most photogenic courses in the region.`,
    bestFor: ['Scenic golf seekers', 'Olazábal fans', 'Intermediate/advanced golfers', 'Mountain view property buyers', 'Those wanting resort amenities'],
  },
  'villaitana': {
    stats: { length: '6,357m', slope: '137', rating: '73.2', difficulty: 'Very Challenging' },
    greenFees: { high: '€85-120', low: '€65-90', twilight: '€55-75', buggy: '€45', trolley: '€6', clubs: '€35' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', '5-Star Hotel', 'Multiple Restaurants', 'Spa', 'Gym', 'Pool Complex', 'Golf Academy'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€280,000 - €400,000' },
      { type: '3-bed apartment', range: '€380,000 - €550,000' },
      { type: '3-bed townhouse', range: '€500,000 - €750,000' },
      { type: '3-bed villa', range: '€750,000 - €1,500,000' },
    ],
    faqs: [
      { question: 'Who designed the courses at Villaitana?', answer: 'Villaitana features two championship courses: the Levante course designed by Jack Nicklaus, and the Poniente course designed by Bernhard Langer. Having two courses by such golfing legends makes Villaitana unique in Costa Blanca.' },
      { question: 'What is the difference between the Levante and Poniente courses?', answer: 'The Levante (Nicklaus) course is the longer, more challenging of the two with dramatic elevation changes. The Poniente (Langer) course is slightly shorter and more playable, though still demanding. Both offer exceptional quality.' },
      { question: 'Does Villaitana have a hotel?', answer: 'Yes, Villaitana is anchored by a luxurious 5-star hotel with multiple restaurants, a full spa, fitness center, and pool complex. It\'s one of the most complete golf resort experiences in Spain.' },
      { question: 'How difficult is Villaitana?', answer: 'Both courses are challenging. The Levante has a slope of 137, making it one of the toughest courses in the region. Average golfers should play from forward tees. The Poniente is slightly more forgiving but still demands a complete game.' },
      { question: 'Is Villaitana near Benidorm?', answer: 'Yes, Villaitana is located in the hills behind Finestrat, just 10 minutes from Benidorm. This means you can combine championship golf with Benidorm\'s beaches, restaurants, and entertainment.' },
      { question: 'What are property prices at Villaitana?', answer: 'Villaitana is one of Costa Blanca\'s most exclusive addresses. Apartments start around €280,000, with villas reaching €1.5 million or more. The combination of two championship courses and 5-star facilities commands premium prices.' },
      { question: 'Is Villaitana suitable for families?', answer: 'Yes, the 5-star hotel facilities make Villaitana excellent for families. Non-golfers have the spa, pool, and proximity to Benidorm\'s attractions. The resort atmosphere caters to all ages.' },
      { question: 'How far is Villaitana from Alicante Airport?', answer: 'Villaitana is approximately 50km from Alicante Airport, about 40-45 minutes by car. This relatively easy access makes it convenient for golf trips.' },
    ],
    extendedDescription: `Villaitana Golf represents the pinnacle of Costa Blanca golf—the only resort in the region boasting two championship courses designed by legends of the game. Jack Nicklaus and Bernhard Langer each brought their unique philosophies to create layouts that would challenge the best players while providing memorable experiences for all visitors.

The Levante course, Nicklaus's creation, is the longer and more demanding of the two. It climbs into the hills behind Finestrat with dramatic elevation changes and panoramic views extending to the Mediterranean. Nicklaus's trademark strategic bunkering and bold green complexes are evident throughout. With a slope of 137, this is a serious examination of golf that rewards accurate shot-making and course management.

Langer's Poniente course offers a slightly different experience—still challenging but more playable for average golfers. The design emphasizes rhythm and flow, with each hole leading naturally to the next. Both courses share Villaitana's exceptional conditioning, with greens that roll true and fairways maintained to tournament standards.

For property buyers, Villaitana represents ultra-premium Costa Blanca living. The residential community enjoys access to both courses and the 5-star hotel facilities, creating a complete lifestyle package. Properties here command the highest prices in the region, reflecting the unmatched combination of championship golf, resort amenities, and prestigious address.`,
    signatureHoles: `On the Levante, the par-4 14th is a dramatic downhill hole with the Mediterranean visible beyond the green—one of Costa Blanca's most photographed golf holes. On the Poniente, the par-3 6th over water to an island green tests nerve and precision. Both courses finish with challenging closing holes that have decided many matches on the 18th green.`,
    bestFor: ['Serious golfers', 'Luxury seekers', 'Those wanting variety (two courses)', 'Premium property buyers', 'Resort lifestyle enthusiasts'],
  },
  'javea': {
    stats: { length: '2,461m', slope: '104', rating: '33.1', difficulty: 'Easy-Medium' },
    greenFees: { high: '€50-60', low: '€35-45', twilight: '€25-35', buggy: '€25', trolley: '€4', clubs: '€15' },
    facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Pool', 'Tennis Courts'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€250,000 - €400,000' },
      { type: '3-bed apartment', range: '€380,000 - €550,000' },
      { type: '3-bed townhouse', range: '€450,000 - €700,000' },
      { type: '3-bed villa', range: '€700,000 - €2,000,000' },
    ],
    faqs: [
      { question: 'Is Jávea Golf a 9 or 18 hole course?', answer: 'Jávea Golf Club is a charming 9-hole course, making it ideal for quick rounds or players wanting a less intensive golf experience. You can play 18 holes by going around twice with different tee positions.' },
      { question: 'Is Jávea Golf suitable for beginners?', answer: 'Absolutely. The 9-hole format and manageable length make Jávea ideal for beginners, returning golfers, or those wanting a social round without a 4+ hour commitment. The club has a friendly, welcoming atmosphere.' },
      { question: 'What are the views like at Jávea Golf?', answer: 'Jávea Golf enjoys spectacular views of the Montgó mountain, one of Costa Blanca\'s most iconic landmarks. The course is set in the hills above the town with beautiful Mediterranean vegetation throughout.' },
      { question: 'What are property prices in Jávea?', answer: 'Jávea is one of Costa Blanca\'s most prestigious towns, with property prices reflecting this. Apartments typically start around €250,000, with luxury villas reaching €2 million or more. The combination of beach, town character, and natural beauty commands premium prices.' },
      { question: 'Is Jávea Golf a private club?', answer: 'Jávea Golf Club welcomes visitors as well as members. Booking a tee time in advance is recommended, especially during busy periods. The club has an inclusive, friendly atmosphere.' },
      { question: 'How far is Jávea Golf from the beach?', answer: 'Jávea Golf is about 5km from the beaches at Arenal and Granadella, approximately 10 minutes by car. Jávea\'s coastline features both sandy beaches and secluded coves.' },
      { question: 'What other courses are near Jávea?', answer: 'La Sella Golf (20 mins), Oliva Nova (25 mins), and Altea Don Cayo (25 mins) are the nearest full-length courses. Jávea\'s 9-hole format complements these for those wanting variety.' },
      { question: 'Does Jávea Golf have a pool and tennis?', answer: 'Yes, the club has a swimming pool and tennis courts, making it a proper club rather than just a golf course. The social facilities add to the community atmosphere.' },
    ],
    extendedDescription: `Jávea Golf Club occupies a special place in Costa Blanca North golf—a charming 9-hole layout with views of the majestic Montgó mountain that offers a more intimate alternative to the region's championship courses. For golfers who value atmosphere, scenery, and social golf over challenging yardage, Jávea delivers an experience that longer courses cannot match.

The course layout makes intelligent use of the available terrain, with each hole offering a distinct challenge and character. At 2,461 meters for 9 holes, it's not about length—it's about shot-making and enjoyment. The Montgó views provide constant companionship, making this one of the most scenic rounds in the region regardless of how you score.

The club atmosphere at Jávea is notably welcoming. This is a place where members and visitors mix easily, where post-round drinks are as important as the round itself. The swimming pool and tennis courts add social dimensions beyond golf, creating a true club environment. For many residents, Jávea Golf is as much about community as it is about the game.

For property buyers, Jávea represents Costa Blanca North at its finest. This sophisticated town combines Spanish character with international influence, offering excellent restaurants, beautiful beaches, and a quality of life that attracts discerning buyers. Property prices are among the highest on the coast, but the lifestyle delivered is exceptional.`,
    signatureHoles: `The par-3 5th offers the best Montgó views, with the imposing mountain dominating the backdrop as you play towards a well-protected green. The finishing hole, a short par-4, brings you back to the welcoming clubhouse where refreshments await.`,
    bestFor: ['Social golfers', 'Beginners', 'Those wanting quick rounds', 'Scenic golf lovers', 'Premium property seekers'],
  },
  'altea': {
    stats: { length: '2,583m', slope: '108', rating: '34.2', difficulty: 'Easy-Medium' },
    greenFees: { high: '€45-55', low: '€30-40', twilight: '€25-30', buggy: '€25', trolley: '€4', clubs: '€15' },
    facilities: ['Putting Green', 'Pro Shop', 'Restaurant & Bar with Views', 'Terrace'],
    propertyPrices: [
      { type: '2-bed apartment', range: '€220,000 - €350,000' },
      { type: '3-bed apartment', range: '€320,000 - €480,000' },
      { type: '3-bed townhouse', range: '€400,000 - €600,000' },
      { type: '3-bed villa', range: '€600,000 - €1,500,000' },
    ],
    faqs: [
      { question: 'Is Altea Golf (Don Cayo) a full 18-hole course?', answer: 'Don Cayo is a 9-hole course, but you can play 18 holes using different tee positions for each round. It\'s a compact course ideal for those wanting golf without a full-day commitment.' },
      { question: 'What are the views like at Don Cayo?', answer: 'Don Cayo offers spectacular panoramic views across the Mediterranean and the Altea coastline. The elevated position provides some of the best coastal views of any Costa Blanca course.' },
      { question: 'Is Don Cayo difficult?', answer: 'Don Cayo is moderately challenging but suitable for all levels. The hillside terrain creates interesting elevation changes, but the course is not overly long or punishing.' },
      { question: 'What are property prices in Altea?', answer: 'Altea is one of Costa Blanca\'s most artistic and sought-after towns. Property prices start around €220,000 for apartments, with premium villas reaching €1.5 million. The town\'s cultural reputation and beautiful old quarter command premium prices.' },
      { question: 'Is Don Cayo near the beach?', answer: 'Don Cayo is located in the Sierra Bernia hills above Altea, approximately 10 minutes from the beautiful Altea beaches and the charming old town.' },
      { question: 'What is the clubhouse like at Don Cayo?', answer: 'The clubhouse terrace offers some of the best views in Costa Blanca golf—a perfect spot for post-round drinks overlooking the Mediterranean. The restaurant serves good food at reasonable prices.' },
      { question: 'What other courses are near Altea?', answer: 'Villaitana (15 mins), La Sella (25 mins), and Jávea (25 mins) are nearby for those wanting variety or longer courses.' },
      { question: 'Is Don Cayo suitable for beginners?', answer: 'Yes, the 9-hole format and manageable length make Don Cayo accessible for beginners while still offering challenge for experienced golfers.' },
    ],
    extendedDescription: `Don Cayo Golf in Altea offers something unique among Costa Blanca courses—a compact 9-hole layout with views that rival any full championship course. Perched in the hills above Altea, the clubhouse terrace looks out across the Mediterranean in a panorama that makes even a poor round feel worthwhile.

The course layout is designed to offer variety within its 9 holes. The hillside terrain creates natural elevation changes, with some holes playing uphill and others offering dramatic downhill shots with sea views. At 2,583 meters for 9 holes, it's not about length—it's about enjoyment, scenery, and social golf.

What makes Don Cayo special is its setting within Altea's unique atmosphere. This artistic town has attracted creatives and free spirits for decades, creating a character quite different from other Costa Blanca destinations. The whitewashed old town, excellent restaurants, and cultural events make Altea a lifestyle destination rather than just a beach town.

For property buyers, Altea offers prestige and character. The town's artistic heritage, beautiful old quarter, and sophisticated atmosphere attract discerning buyers. Property prices are accordingly high, but the lifestyle delivered is distinctive—this is Costa Blanca at its most cultured.`,
    signatureHoles: `Every hole at Don Cayo offers views, but the par-3 6th stands out—playing from an elevated tee towards the sea creates a shot where the Mediterranean seems to stretch endlessly beyond the green. The finishing holes wind back towards the clubhouse with its famous terrace views.`,
    bestFor: ['View seekers', 'Social golfers', 'Art/culture lovers', 'Those wanting character', 'Premium property seekers'],
  },
};

// Default data for courses without specific entries
const DEFAULT_COURSE_DATA = {
  stats: { difficulty: 'Medium' },
  greenFees: { high: '€70-85', low: '€50-65', twilight: '€40-50', buggy: '€35', trolley: '€5', clubs: '€25' },
  facilities: ['Driving Range', 'Putting Green', 'Pro Shop', 'Restaurant & Bar', 'Locker Rooms'],
  propertyPrices: [
    { type: '2-bed apartment', range: '€180,000 - €280,000' },
    { type: '3-bed villa', range: '€350,000 - €550,000' },
  ],
  faqs: [] as { question: string; answer: string }[],
  extendedDescription: '',
  signatureHoles: '',
  bestFor: [] as string[],
};

function getCourseSchema(course: typeof GOLF_COURSES[0], courseData: typeof DEFAULT_COURSE_DATA) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'GolfCourse',
      name: course.name,
      description: course.description,
      url: `https://www.newbuildhomescostablanca.com/golf/${course.slug}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: course.town,
        addressRegion: 'Alicante',
        addressCountry: 'ES',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: course.lat,
        longitude: course.lng,
      },
      amenityFeature: courseData.facilities.map(f => ({
        '@type': 'LocationFeatureSpecification',
        name: f,
      })),
      numberOfHoles: course.holes,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: courseData.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.newbuildhomescostablanca.com/' },
        { '@type': 'ListItem', position: 2, name: 'Golf Properties', item: 'https://www.newbuildhomescostablanca.com/golf' },
        { '@type': 'ListItem', position: 3, name: course.name, item: `https://www.newbuildhomescostablanca.com/golf/${course.slug}` },
      ],
    },
  ];
}

export default async function GolfCoursePage({ params }: { params: { slug: string } }) {
  const course = getGolfCourseBySlug(params.slug);
  if (!course) {
    notFound();
  }

  const courseData = COURSE_DATA[params.slug] || DEFAULT_COURSE_DATA;

  // Get properties near this course
  const allProperties = await getAllProperties();
  
  // Properties with golf views near this course's towns
  const golfProperties = allProperties.filter(p => 
    (p.hasGolfview || p.features?.some(f => f.toLowerCase().includes('golf'))) &&
    course.nearbyTowns.some(town => p.town?.toLowerCase().includes(town.toLowerCase()))
  );
  
  // All properties in nearby towns
  const nearbyProperties = allProperties.filter(p =>
    course.nearbyTowns.some(town => p.town?.toLowerCase().includes(town.toLowerCase()))
  );

  // Other courses in same region
  const regionCourses = getGolfCoursesByRegion(course.region as 'north' | 'south')
    .filter(c => c.id !== course.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCourseSchema(course, courseData)) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/golf" className="hover:text-white">Golf</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{course.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {course.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {course.holes}-hole {course.designer ? `course designed by ${course.designer}` : 'championship course'} in {course.town}, Costa Blanca {course.region === 'south' ? 'South' : 'North'}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white/20 px-4 py-2 rounded-lg">{course.holes} Holes</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg">Par {course.par}</span>
                {courseData.stats.difficulty && (
                  <span className="bg-white/20 px-4 py-2 rounded-lg">{courseData.stats.difficulty}</span>
                )}
                {course.yearOpened && (
                  <span className="bg-white/20 px-4 py-2 rounded-lg">Est. {course.yearOpened}</span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Smart fallback: show golf properties if available, otherwise show nearby properties */}
                {golfProperties.length > 0 ? (
                  <Link
                    href={`/properties?location=${encodeURIComponent(course.town)}&feature=golf`}
                    className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Golf Properties ({golfProperties.length})
                  </Link>
                ) : nearbyProperties.length > 0 ? (
                  <Link
                    href={`/properties?location=${encodeURIComponent(course.town)}`}
                    className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    View Properties in {course.town} ({nearbyProperties.length})
                  </Link>
                ) : (
                  <Link
                    href="/properties"
                    className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Browse All Properties
                  </Link>
                )}
                {course.website && (
                  <a
                    href={course.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/50 hover:border-white text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Course Website →
                  </a>
                )}
              </div>
            </div>
            
            {/* Quick Stats Card */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 min-w-[280px]">
              <h3 className="font-semibold mb-4">Course Details</h3>
              <div className="space-y-3 text-white/90">
                <div className="flex justify-between">
                  <span>Holes:</span>
                  <span className="font-semibold">{course.holes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Par:</span>
                  <span className="font-semibold">{course.par}</span>
                </div>
                {courseData.stats.length && (
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span className="font-semibold">{courseData.stats.length}</span>
                  </div>
                )}
                {courseData.stats.slope && (
                  <div className="flex justify-between">
                    <span>Slope:</span>
                    <span className="font-semibold">{courseData.stats.slope}</span>
                  </div>
                )}
                {courseData.stats.rating && (
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="font-semibold">{courseData.stats.rating}</span>
                  </div>
                )}
                {course.designer && (
                  <div className="flex justify-between">
                    <span>Designer:</span>
                    <span className="font-semibold">{course.designer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">
            About {course.name}
          </h2>
          
          <div className="prose prose-lg max-w-none text-stone-700">
            {courseData.extendedDescription ? (
              courseData.extendedDescription.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))
            ) : (
              <p>{course.description}</p>
            )}
          </div>
          
          {courseData.signatureHoles && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">⛳ Signature Holes</h3>
              <p className="text-stone-700">{courseData.signatureHoles}</p>
            </div>
          )}
          
          {courseData.bestFor.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Best For</h3>
              <div className="flex flex-wrap gap-2">
                {courseData.bestFor.map((item, idx) => (
                  <span key={idx} className="bg-stone-100 text-stone-700 px-4 py-2 rounded-lg text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Green Fees Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            {course.name} Green Fees 2025
          </h2>
          <p className="text-center text-stone-600 mb-8">
            Current pricing for visitors. Fees may vary—contact the club for latest rates.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#1e3a5f] text-white px-6 py-4">
                <h3 className="font-semibold">Green Fees</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-600">High Season (Mar-May, Sep-Nov)</span>
                  <span className="font-semibold text-[#1e3a5f]">{courseData.greenFees.high}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-600">Low Season (Jun-Aug, Dec-Feb)</span>
                  <span className="font-semibold text-green-600">{courseData.greenFees.low}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Twilight (after 2pm)</span>
                  <span className="font-semibold text-green-600">{courseData.greenFees.twilight}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#1e3a5f] text-white px-6 py-4">
                <h3 className="font-semibold">Equipment Hire</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-600">Electric Buggy</span>
                  <span className="font-semibold text-[#1e3a5f]">{courseData.greenFees.buggy}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-600">Pull/Electric Trolley</span>
                  <span className="font-semibold text-[#1e3a5f]">{courseData.greenFees.trolley}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Club Hire (full set)</span>
                  <span className="font-semibold text-[#1e3a5f]">{courseData.greenFees.clubs}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-stone-500 mt-6 text-center">
            * Prices are approximate and subject to change. Contact the club or book online for current rates and availability.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">
            Facilities at {course.name}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courseData.facilities.map((facility, idx) => (
              <div key={idx} className="bg-stone-50 rounded-lg p-4 text-center">
                <span className="text-2xl mb-2 block">
                  {facility.includes('Range') ? '🎯' :
                   facility.includes('Putting') ? '⛳' :
                   facility.includes('Shop') ? '🛒' :
                   facility.includes('Restaurant') || facility.includes('Bar') ? '🍽️' :
                   facility.includes('Locker') ? '🚿' :
                   facility.includes('Academy') ? '📚' :
                   facility.includes('Hotel') ? '🏨' :
                   facility.includes('Spa') ? '💆' :
                   facility.includes('Pool') ? '🏊' :
                   facility.includes('Tennis') ? '🎾' :
                   facility.includes('Gym') ? '💪' :
                   '✓'}
                </span>
                <span className="text-sm text-stone-700">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Prices */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
            Property Prices Near {course.name}
          </h2>
          <p className="text-center text-stone-600 mb-8">
            Average property prices in the {course.town} area. Contact us for current listings.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {courseData.propertyPrices.map((price, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-lg font-semibold text-[#1e3a5f] mb-2">{price.type}</div>
                <div className="text-2xl font-bold text-[#e8913a]">{price.range}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href={`/properties?location=${encodeURIComponent(course.town)}`}
              className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              View All Properties Near {course.name} ({nearbyProperties.length})
            </Link>
          </div>
        </div>
      </section>

      {/* How to Get There */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">
            Getting to {course.name}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-3xl mb-3">✈️</div>
              <h3 className="font-semibold text-[#1e3a5f] mb-2">From Alicante Airport</h3>
              <p className="text-stone-600">
                {course.region === 'south' ? '35-45 minutes via AP-7' : '60-90 minutes via AP-7'}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-3">✈️</div>
              <h3 className="font-semibold text-[#1e3a5f] mb-2">From Murcia Airport</h3>
              <p className="text-stone-600">
                {course.region === 'south' ? '20-35 minutes' : '90+ minutes'}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-[#1e3a5f] mb-2">GPS Coordinates</h3>
              <p className="text-stone-600">
                {course.lat.toFixed(5)}, {course.lng.toFixed(5)}
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-stone-50 rounded-xl">
            <h3 className="font-semibold text-[#1e3a5f] mb-3">Nearby Towns</h3>
            <div className="flex flex-wrap gap-2">
              {course.nearbyTowns.map((town, idx) => (
                <Link
                  key={idx}
                  href={`/areas/${town.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white px-4 py-2 rounded-lg text-stone-700 hover:text-[#e8913a] transition-colors"
                >
                  {town}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {courseData.faqs.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 text-center">
              Frequently Asked Questions About {course.name}
            </h2>
            <p className="text-center text-stone-600 mb-10">
              Everything you need to know about playing and living near {course.name}.
            </p>
            
            <div className="space-y-4">
              {courseData.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-[#1e3a5f] hover:text-[#e8913a] transition-colors flex justify-between items-center">
                    {faq.question}
                    <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-4 text-stone-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Courses in Region */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">
            Other Golf Courses in Costa Blanca {course.region === 'south' ? 'South' : 'North'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionCourses.slice(0, 6).map((otherCourse) => (
              <Link
                key={otherCourse.id}
                href={`/golf/${otherCourse.slug}`}
                className="bg-stone-50 rounded-xl p-6 hover:shadow-md transition-shadow group"
              >
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-[#e8913a] transition-colors">
                  {otherCourse.name}
                </h3>
                <p className="text-stone-600 mb-3">{otherCourse.town}</p>
                <div className="flex gap-3 text-sm text-stone-500">
                  <span>{otherCourse.holes} holes</span>
                  <span>Par {otherCourse.par}</span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/golf"
              className="text-[#e8913a] hover:text-[#d4792c] font-semibold"
            >
              View All Costa Blanca Golf Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Property Near {course.name}?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today to discuss golf properties in {course.town}. 
            We'll help you find the perfect home for your golf lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="tel:+34634044970"
              className="bg-[#e8913a] hover:bg-[#d4792c] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              📞 +34 634 044 970
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
