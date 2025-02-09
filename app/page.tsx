"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function DreamInterpretation() {
  const [dream, setDream] = useState("")
  const [interpretation, setInterpretation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInterpretDream = async () => {
    setIsLoading(true)
    // 这里我们模拟一个API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // 生成一个简单的解梦结果
    const result = `您梦到的"${dream}"可能意味着：${getRandomInterpretation()}`
    setInterpretation(result)
    setIsLoading(false)
  }

  const getRandomInterpretation = () => {
    const interpretations = [
      "近期可能会有好运降临。",
      "您可能正在面临一些挑战，但终将克服。",
      "这个梦境反映了您内心深处的渴望。",
      "您可能需要在生活中做出一些改变。",
      "这个梦境暗示您应该更加关注身边的人和事。",
    ]
    return interpretations[Math.floor(Math.random() * interpretations.length)]
  }

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/chinese-pattern.svg"
          alt="Chinese Pattern Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>
      <div className="relative z-10 max-w-md mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-red-800 shadow-xl">
          <CardHeader className="text-center border-b border-red-800 pb-4">
            <CardTitle className="text-2xl font-bold text-red-800">周公解梦</CardTitle>
            <CardDescription className="text-gray-600">聆听您的梦境，揭示生活的奥秘</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Input
                placeholder="请描述您的梦境..."
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                className="border-red-800 focus:ring-red-800 focus:border-red-800"
              />
              <Button
                onClick={handleInterpretDream}
                disabled={isLoading || !dream}
                className="w-full bg-red-800 hover:bg-red-700 text-white"
              >
                {isLoading ? "解梦中..." : "解梦"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t border-red-800 pt-4">
            {interpretation && <p className="text-sm text-gray-700">{interpretation}</p>}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

