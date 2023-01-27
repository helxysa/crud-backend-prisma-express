import  express  from "express";
import { PrismaClient } from '@prisma/client'
import cors from "cors"

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

app.use((req, res, next) => {
  console.log('Acessou o middleware')
  res.header("Acess-Control-Allow", "*");
  next();
})

app.use(cors())

app.listen(3030, ()=>console.log("server is running on port 3030"))

app.post('/cadastro', async (req, res) => {
  const {name, email, course} = req.body;
  const aluno = await prisma.aluno.create({
    data: {
      name : String(name),
      email: String(email),
      course: String(course),
    }
  });
  res.json(aluno);
})

app.get('/aluno', async (req, res) => {
  const aluno = await prisma.aluno.findMany();
  res.json(aluno);
});

app.get('/aluno/:id', async (req, res) => {
  const id = req.params.id;
  const aluno = await prisma.aluno.findUnique({
    where: {
      id: Number(id),
    }
  });
  res.json(aluno);
});




app.put('/atualizar', async(req,res)=>{
   const {id, course, email} = req.body
   const updatedAluno = await prisma.aluno.update({
    where: {
      id: Number(id)
    },
    data: {
     email: String(email),
      course: String(course),
    }
   });
   res.json(updatedAluno)
})

app.delete('/:id', async (req, res)=>{
  const id = req.params.id
  const deletedAluno = await prisma.aluno.delete({
    where:{
      id:  Number(id),
    }
  });
  res.json(deletedAluno)
})


