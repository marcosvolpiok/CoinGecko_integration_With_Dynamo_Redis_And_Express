class cotizationService {
    constructor(cotizationRepository) {
        this.cotizationRepository=cotizationRepository;
    }
      
    list = async () => {
        const cotization = await this.cotizationRepository.listAll();

        return cotization;
    }
}

module.exports = cotizationService;