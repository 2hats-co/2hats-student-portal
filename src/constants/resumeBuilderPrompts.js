const marketing = {bio:'I am a third year business student at 2hats University majoring in marketing. I have experience working as a marketing intern at 2hats, where I used tools such as Google Analytics, Adword and Facebook Ads to develop the firm’s online and social media presence. After graduating I aspire to work as a digital marketer in the fashion industry, where I can use my understanding of consumer behaviour to build innovative, ‘out of the box’ marketing strategies. ',
edu:`WAM of 76
Received a High Distinction in Digital Marketing in 2018
Member of the 2hats University Marketing Society`,
exp:`Used Google Analytics, Adword and Facebook Ads to increase traffic to 2hats’ Facebook page and website by 250%
Developed 2hats’ online and offline marketing strategy to create brand awareness and grow the company’s customer base
Created blog posts and visual content for 2hats’ Facebook page and website`
}
const it = {bio:`I am a third year software engineering student at 2hats University. I have experience working as a front-end software developer intern at 2hats, where I used React, HTML, CSS and JavaScript to build the company’s new website. I aspire to pursue a career as a full-stack developer after graduating, with a keen desire to contribute my programming skills to build functional, aesthetically-pleasing products.`,
edu:`WAM of 76
Received a High Distinction in Digital Logic in 2018
Member of the 2hats University Programming Society`,
exp:`Wrote the front-end code for 2hats’ new website
Liaised with team members from the back-end developer, marketing and business development divisions to deliver functional, aesthetically-pleasing products
Used React.js, HTML, CSS and JavaScript`}
const business = {bio:`I am a third year business student at 2hats University majoring in accounting. I have experience working as a sales intern at 2hats, where I developed skills in customer service, working under pressure and verbal communication. In the future I look forward to pursuing a career as a business development manager, where I can use my passion for innovative thinking and relationship building to organically grow a firm’s outreach.`,
edu:`WAM of 76
Received a High Distinction in Management Accounting in 2018
Member of the 2hats University Business Society`,
exp:`Delivered sales pitches and responded to customer queries to drive customer engagement with 2hats
Surpassed all sales targets, and increased annual revenue by 75%
Developed a strong customer-focused work ethic that prioritised client value creation and retention `}
const design = {bio:`I am a third year design student at 2hats University. I have experience working as a graphic design intern at 2hats, where I used tools such as Photoshop, Illustrator and InDesign to develop logos, promotional materials and icons. In the future I aim to pursue a career in graphic design through impactful visuals and innovative communication.`,
edu:`WAM of 76
Received a High Distinction in Design and Innovation in 2018
Member of the 2hats University Graphic Design Society`,
exp:`Designed logos, promotional materials and icons for 2hats’ website and social media posts
Liaised with team members from the marketing team to deliver aesthetically-pleasing, eye-catching designs that convey 2hats’ fun, youthful brand image`}

export function getPrompts(field){
    switch (field) {
        case 'Marketing':return marketing
        case 'IT':return it
        case 'Business':return business
        case 'Design':return design
        default:
            break;
    }
  
}