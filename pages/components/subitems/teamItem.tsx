interface TeamItemProps {
  id: string,
  name: string,
  funcList: Array<any>
}

export default function TeamItem({id, name, funcList}:TeamItemProps) {
  
  return (
    <div>
      <div className='grid grid-cols-6 py-2 items-center px-4 lg:px-8 xl:text-lg text-xs'>
        <div>{name}</div>
        <div className='col-span-5'>
        {
          funcList?.map((func) => {
            return (
              <div key={func['id']}>
                {func['name']}
              </div>
            )
          })  
        }
        </div>
      </div>
    </div>
  )
}