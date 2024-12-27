import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PokemonService {

  private defaultLimit:number

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonmodel:Model<Pokemon>,
    private readonly configServices:ConfigService
  ){
    this.defaultLimit = configServices.get<number>('defaultlimit');

  }


 async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()

    try {
      const Pokemon = await this.pokemonmodel.create(createPokemonDto)

      return Pokemon;

    } catch (error) {
      this.handleExeption(error)
   }
 }
  findAll(paginatorDto:PaginatorDto) {

  const {limit = this.defaultLimit ,offset = 0}  =  paginatorDto

    return this.pokemonmodel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no:1
    })
    .select('-__v')
  }

  async findOne(id: string) {

    let pokemon:Pokemon;

    if (!isNaN(+id)) {

      pokemon = await this.pokemonmodel.findOne({no:id})

      if(!pokemon)
      throw new NotFoundException(`Pokemon with id , name or no "${id}" not found`)
      return pokemon
   }

    if(!pokemon && isValidObjectId(id)){
      pokemon = await this.pokemonmodel.findById(id)
      return pokemon
    }

    if(!pokemon){
      pokemon = await this.pokemonmodel.findOne({name:id.toLocaleLowerCase().trim()})
      return pokemon
    }
    
  }

 async  update(term: string, updatePokemonDto: UpdatePokemonDto) {

  try {
    const pokemon = await this.findOne(term);
   
  if (updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

      await pokemon.updateOne( updatePokemonDto)

      return {...pokemon.toJSON , ...updatePokemonDto};

  } catch (error) {
    this.handleExeption(error)
  }
  
  }

 async remove(id: string) {

  const  {deletedCount} = await this.pokemonmodel.deleteOne({_id:id})
  if (deletedCount === 0) {
    throw new BadRequestException(`Pokemon whit id"${id}" not found`)
  }

    return;
   
  }

  private handleExeption(error:any){
    if (error.code === 11000) {
      throw new BadRequestException(`pokemon existis in db ${JSON.stringify(error.keyPattern)}`)
    }
      throw new InternalServerErrorException(`Can't create Pokemon - check server logs`)
  }
}
