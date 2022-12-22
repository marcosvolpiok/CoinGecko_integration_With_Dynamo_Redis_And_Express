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
}


module.exports = cotizationController;