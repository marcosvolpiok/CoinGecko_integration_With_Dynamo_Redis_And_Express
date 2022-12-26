class customerController{
  constructor(customerService) {
    this.customerService=customerService;
  }

  add = async (req, res) => { 
    try{
      const customer=await this.customerService.add(req);
      res.json(customer);
    }catch(e){
      res.status(500).json({message: e.message, stack: e.stack})
    }
  }  

  update = async (req, res) => { 
    try{
      const customer=await this.customerService.update(req);
      res.json(customer);
    }catch(e){
      res.status(500).json({message: e.message})
    }
  } 

  login = async (req, res) => { 
    try{
      const customer=await this.customerService.login(req);
      res.json(customer);
    }catch(e){
      res.status(500).json({message: e.message})
    }
  } 
}


module.exports = customerController;