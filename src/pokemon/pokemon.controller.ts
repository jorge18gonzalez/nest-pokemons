import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMogoIdPipe } from 'src/common/pipes/parse-mogo-id/parse-mogo-id.pipe';
import { PaginatorDto } from 'src/common/dto/paginator.dto';

@Controller('pokemon')
export class PokemonController {

  constructor(
    private readonly pokemonService: PokemonService
  ) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    
    return this.pokemonService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto){
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMogoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
