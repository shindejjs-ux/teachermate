import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);



export async function POST(req: Request) {

  try {

    const body = await req.json();


    const {
      className,
      subject,
      chapter,
      marks,
      difficulty,
    } = body;



    if (!className || !subject || !chapter) {

      return NextResponse.json({

        success:false,

        error:"Missing required fields"

      });

    }



    const model = genAI.getGenerativeModel({

      model:"gemini-3.5-flash"

    });



    const prompt = `

You are an expert CBSE teacher.

Generate a high quality CBSE question paper.


School Name:
THE ADITYA BIRLA PUBLIC SCHOOL, RENUKOOT


Class:
${className}


Subject:
${subject}


Chapter:
${chapter}


Maximum Marks:
${marks}


Difficulty Level:
${difficulty}



Follow latest CBSE pattern.


Include:

1. School Header
2. General Instructions
3. Section A - MCQ Questions
4. Section B - Very Short Answer Questions
5. Section C - Short Answer Questions
6. Section D - Long Answer Questions
7. Section E - Competency Based Questions


Rules:

- Maintain proper marks distribution.
- Include conceptual questions.
- Include HOTS questions.
- Questions should match class level.
- Do not provide answers.
- Generate only question paper.


`;



    let result:any = null;



    // Retry system

    for(let attempt=1; attempt<=3; attempt++){

      try{


        result = await model.generateContent(prompt);

        break;


      }

      catch(error:any){


        console.log(
          "Gemini attempt failed:",
          attempt
        );


        if(
          error.status === 503 ||
          error.status === 429
        ){

          if(attempt < 3){

            await new Promise(
              resolve =>
              setTimeout(resolve,5000)
            );

            continue;

          }

        }


        throw error;

      }

    }



    const paper =
      result.response.text();



    return NextResponse.json({

      success:true,

      paper

    });



  }

  catch(error:any){


    console.log(
      "Question Paper Error:",
      error
    );



    return NextResponse.json({

      success:false,

      error:
      "AI service is temporarily busy. Please try again."

    });


  }

}