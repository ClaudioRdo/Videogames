import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '../../redux/actions'
import { Button, InputText, Label,Select,Textarea } from '../common'



const CreateVideogame = () => {
  
  const genres = useSelector(state=>state.genres)
  
  return (
    <div>
      <h1>Create Videogame</h1>
      <form>
        <Label value='Name:' htmlFor={'name'}/>
        <InputText placeholder={'Enter the name'} id={'name'}/> 
        <Label value='Description:' htmlFor={'description'}/>
        <Textarea name='description' id='description'/>
        <Label value='Released date:' htmlFor={'released'}/>
        <InputText placeholder={'Enter the date'} id={'released'}/>
        <Label value='Rating:' htmlFor='rating'/>
        <InputText placeholder={'Enter rating: 1 to 5'} id={'rating'}/>
        <Label value='Genres:'/>
        <Select options={genres}/>
        <Label value='Platforms'/>
        <Button value='Create'/>
      </form>
    </div>
  )
}

export default CreateVideogame