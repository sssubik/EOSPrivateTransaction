#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] eoshash : public contract {
  public:
      using contract::contract;

    [[eosio::action]]
      void timestamp(std::string hash, std::string hash4d) {}

    [[eosio::action]]
      void timestamphash(std::string hash) {}
    
     [[eosio::action]]
      void timestamp4d(std::string hash4d) {}


  
};