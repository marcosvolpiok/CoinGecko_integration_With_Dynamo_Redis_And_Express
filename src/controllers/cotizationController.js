class cotizationController{
  constructor(cotizationService) {
    this.cotizationService = cotizationService;
  }

  list = async (req, res) => { 
    try{
      const cotization = await this.cotizationService.list();
      res.json(cotization);
    }catch(e){
      res.status(500).json({message: e.message})
    }
  }

  add = async (req, res) => { 
    try{
      console.log('req.body', req.body)
      const cotization = await this.cotizationService.add(req, res);
      res.json(cotization);
    }catch(e){
      res.status(500).json({message: e.message, stack: e.stack})
    }
  }

  listByUser = async (req, res) => { 
    try{
      const cotizations = await this.cotizationService.listByUser(res);
      res.json(cotizations);
    }catch(e){
      res.status(500).json({message: e.message, stack: e.stack})
    }
  }
}


module.exports = cotizationController;