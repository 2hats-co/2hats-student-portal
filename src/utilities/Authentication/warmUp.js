import { cloudFunction } from '../CloudFunctions';

export const warmUp = (name) => {
    const request = { 
        warmUp: true
    };

    cloudFunction(name, request
        ,() => {
            console.log(`Call ${name} success: `, result);
        }
        ,(error) => {
            console.log(`Call ${name} error: `, error.message);
        });
};