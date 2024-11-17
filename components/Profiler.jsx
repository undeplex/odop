import Link from 'next/link'
import React from 'react'

export default function Profiler() {
  return (
    <div className="max-w-md mx-auto">
        <div className="flex gap-3 items-center">
            <img src="/profiler2.jpg" width="100px" className="rounded-full size-[50px] object-cover ring-4 ring-gray-0"/>
            <div>

                <p className="play text-xl">Pierre Nzana</p>
                <p className=" text-sm dark:text-gray-300">#Developper#System Engineer#DevOps#CopyWriter</p>
            </div>
        </div>
        <div className="py-4 px-">
            Pierre est le <span className="underline"> BEO (Brand Excecute Officer) </span>de  <span className="font-bold">Doic llc</span>, il est de meme charger de 
            l'administration des actifs digitaux de la marque ainsi que du 
            du <span className="underline">copywritting</span>  de cette derniere ,ayant de l'experience dans l'environnement Web il se charger
            aussi de toutes les integrations UI/UX possible...
        </div>
        <Link href="/">
        <span className="text-blue-600 underline">
            Apprendre plus sur Doic llc
        </span>
        <span className="ml-3 text-blue-00 underline">
            plus sur Pierre Nzana
        </span>
            </Link>
    </div>
  )
}
