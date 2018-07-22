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

const INDUSTRIES = ['Business','Marketing','Design','IT']
const businessList = [{key:'B2B',label:'B2B Sales'},{key:'RM',label:'Relationship Management'},{key:'LG',label:'Lead Generation'}]
const marketingList = [{key:'CW',label:'Content Writing'},{key:'SMM',label:'Social Media Marketing'},{key:'SEO',label:'SEO'}]
const DesignList = [{key:'GI',label:'Graphic/Illustration'},{key:'UX',label:'User Experience'},{key:'UI',label:'User Interface'}]
const ITList = [{key:'APP',label:'App/Web Development'},{key:'DEV',label:'Software Development'},{key:'DA',label:'Data Analytics'}]
const ALL_INTERESTS = [].concat(marketingList,DesignList).concat(businessList,ITList)
export function getInterestByKey(key){
    return ALL_INTERESTS.filter(x => x.key === key)
}
export const CAREER_INTERESTS = [{label:'Business',items: businessList},{label:'Marketing',items:marketingList},{label:'Design',items:DesignList},{label:'IT',items:ITList}]
//recursive
// let count={Business:0, Marketing:0,Design:0,IT:0}
// function getIndustryFromInterests(interests, count){

//     CAREER_INTERESTS.forEach(industry=>{
//         industry.items.forEach(item=>{
//             interests.forEach(interest=>{
//                 if(item.key===interest){
//                     console.log(interests,count) 
//                     count[industry.label]= count[industry.label]+1
//                     let newInterests = interests.filter(x=> x!==interest)
//                     if(newInterests.length ===0){
//                         let largestIndex = 0
//     let largestValue = 0
//     let values = Object.values(count)
//     values.forEach((x,k)=>{
//         if (x> largestValue){
//             largestIndex=k;
//             largestValue=x;
//         }
//     })
//     return INDUSTRIES[largestIndex] 
//                     }else{
//                         return (getIndustryFromInterests(newInterests,count))

//                     }
                   
//                 }
//             })
//         })
//     })
//   }


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

export function getIndustryFromInterests(interests){
    let count={Business:0, Marketing:0,Design:0,IT:0}
  
    CAREER_INTERESTS.forEach(industry=>{
        industry.items.forEach(item=>{
            interests.forEach(interest=>{
                if(item.key===interest){
                    count[industry.label]= count[industry.label]+1
                }
            })
        })
    })
    let largestIndex = 0
    let largestValue = 0
    let values = Object.values(count)
    values.forEach((x,k)=>{
        if (x> largestValue){
            largestIndex=k;
            largestValue=x;
        }
    })
    return INDUSTRIES[largestIndex]
}

const SKILLS ={
    B2B:['Salesforce','CRM System','HubSpot'],
    LG:['Salesforce','CRM System','HubSpot'],
    RM:['Zoho','System','Excel'],
    CW:['Wordpress','Word'],
    SMM:['Facebook AD','Google Analytics/Adword','SEO','MailChimp','Canva'],
    SEO:['SEMrush','SE Ranking'],
    GI:['Adobe Photoshop','Adobe Illustrator','Adobe InDesign'],
    UI:['Sketch','Adobe XD','Adobe Photoshop','Adobe Illustrator','Framer'],
    UX:['Sketch','Adobe XD','Balsamiq','InVision','Framer'],
    APP:['JavaScript','HTML/CSS','JQuery','React','Node.JS','Swift','Flutter'],
    DEV:['Java','Python','C','C++','C#','SQL'],
    DA:['Python','SQL','R','Excel','Matlab']
}

export const ALL_SKILLS = Object.values(SKILLS).reduce((r,x)=>{
    return r.concat(x)
})
export function getSkills(interests){
    if(!interests) return [];
    let suggestedSkills = []
    interests.forEach(interest => {
        SKILLS[interest].forEach(skill => {
            if(!suggestedSkills.includes(skill)){
                suggestedSkills.push(skill)
            }
    });})
    return suggestedSkills
}