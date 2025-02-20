const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "API for managing contacts",
        version: "1.0.0"
    },
    host: "localhost:3000",
    schemes: ["http", "https"],
    tags: [
        {
            name: "Contacts",
            description: "Operations with contacts"
        }
    ],
    components: {
        schemas: {
            Contact: {
                type: "object",
                properties: {
                    user_id: { type: "string" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" },
                    favouriteColour: { type: "string" },
                    birthday: { type: "string", format: "date" },
                    school: { type: "string" },
                    status: { type: "string" },
                    logins_count: { type: "number" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                    last_login: { type: "string", format: "date-time" },
                    email_verified: { type: "boolean" }
                }
            }
        }
    }
};


const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
