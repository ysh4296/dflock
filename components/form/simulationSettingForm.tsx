"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";

const InputForm = () => {
  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          설정
        </CardTitle>
        <CardDescription>
          자물쇠 타입, 개수 및 부스터 효과를 설정하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lockType">자물쇠 타입</Label>
          <Select value={""} onValueChange={(value) => {}}>
            <SelectTrigger id="lockType">
              <SelectValue placeholder="자물쇠 타입 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">일반 자물쇠 (only)</SelectItem>
              <SelectItem value="mileage">M자물쇠 (only)</SelectItem>
              <SelectItem value="booster_mileage">
                부스터시에만 M 자물쇠
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="boosterType">부스터 효과 (1-10)</Label>
          <Select value={""} onValueChange={(value) => {}}>
            <SelectTrigger id="boosterType">
              <SelectValue placeholder="부스터 효과 선택" />
            </SelectTrigger>
            <SelectContent>
              {/* {Object.keys(boosterEffects).map((level) => (
                <SelectItem key={level} value={level}>
                  {level} (x
                  {boosterEffects[level as keyof typeof boosterEffects].toFixed(
                    1
                  )}
                  )
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lockCount">자물쇠 개수</Label>
          <Input
            id="lockCount"
            type="number"
            min="1"
            value={""}
            onChange={() => {}}
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="compareMode"
            checked={false}
            onCheckedChange={() => {}}
          />
          <Label htmlFor="compareMode">자물쇠 타입 비교 모드</Label>
        </div>

        <div className="pt-4">
          <Button onClick={() => {}} className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            계산하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputForm;
