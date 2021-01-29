#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] eoshash : public contract {
  public:
      using contract::contract;

    [[eosio::action]]
      void uploadhash(std::string docHash, std::string docISCCHash) {}

    [[eosio::action]]
      void dochash(std::string docHash) {}
    
     [[eosio::action]]
      void dociscchash(std::string docISCCHash) {}


  
};