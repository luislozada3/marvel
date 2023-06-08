export interface CharacterThumbnailDTO {
  path: string
  extension: 'png' | 'jpg'
}

export interface InfoCharacterDTO<T> {
  available: number
  collectionURI: string
  items: T[]
  returned: number
}

export interface CharacterItemDTO {
  resourceURI: string
  name: string
}

export interface CharacterComicsDTO extends InfoCharacterDTO<CharacterItemDTO> {}

export interface CharacterSeriesDTO extends InfoCharacterDTO<CharacterItemDTO> {}

export interface StoriesItemDTO extends CharacterItemDTO {
  type: 'cover' | 'interiorStory'
}

export interface CharacterStoriesDTO extends InfoCharacterDTO<StoriesItemDTO> {}

export interface CharacterEventsDTO extends InfoCharacterDTO<CharacterItemDTO> {}

export interface CharacterUrlDTO {
  type: string
  url: string
}

export interface CharacterDTO {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: CharacterThumbnailDTO
  resourceURI: string
  comics: CharacterComicsDTO
  series: CharacterStoriesDTO
  stories: StoriesItemDTO
  events: CharacterEventsDTO
  urls: CharacterUrlDTO[]
}

export interface DataCharacterDTO {
  offset: number
  limit: number
  total: number
  count: number
  results: CharacterDTO[]
}

export interface ReponseCharacterDTO {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: DataCharacterDTO
}
