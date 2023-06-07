const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabaseUrl = 'https://kbylaysxbafpbojdywtj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWxheXN4YmFmcGJvamR5d3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NTE1MTgsImV4cCI6MTk5OTQyNzUxOH0.Q_fS53HILFzs08uplWRnVz2VDVw_sOcuh3bp5le2lyg';
app.use(bodyParser.json());
const supabase = createClient(supabaseUrl, supabaseKey);

// Consultar todos os produtos
app.get('/produtos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) {
      throw new Error(error.message);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultar um produto pelo ID
app.get('/produtos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single();
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cadastrar um produto
app.post('/produtos', async (req, res) => {
  const produto = req.body;
  try {
    const { data, error } = await supabase.from('produtos').insert(produto);
    if (error) {
      throw new Error(error.message);
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alterar um produto
app.put('/produtos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const produto = req.body;
  try {
    const { data, error } = await supabase.from('produtos').update(produto).eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar um produto
app.delete('/produtos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { data, error } = await supabase.from('produtos').delete().eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
