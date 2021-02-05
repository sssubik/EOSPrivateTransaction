#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] eoshash : public contract {
  public:
      using contract::contract;

    [[eosio::action]]
      void timestamp(std::string hash, std::string security4dhash) {}

    [[eosio::action]]
      void timestamp(std::string hash) {}
    
     [[eosio::action]]
      void timestamp4d(std::string security4dhash) {}


  
};