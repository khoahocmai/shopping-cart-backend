import { Express, Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDocs = (app: Express, PORT: string) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Shopping Cart Management',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization'
          }
        }
      },
      tags: [
        {
          name: 'user',
          description: 'Operations about user'
        },
        {
          name: 'product',
          description: 'Operations about product'
        },
        {
          name: 'auth',
          description: 'Authentication related endpoints'
        },
        {
          name: 'media',
          description: 'Operations about media'
        },
        {
          name: 'order',
          description: 'Operations about order'
        }
      ],
      security: [
        {
          bearerAuth: []
        }
      ],
      servers: [
        {
          url: `http://localhost:${PORT}`
        }
      ]
    },
    apis: ['./src/routes/*']
  }

  const swaggerSpec = swaggerJSDoc(options)
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
