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
import { useGoldChartStore } from "@/store/chart";
import { useInputStore } from "@/store/form";
import { Calculator, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const InputForm = () => {
  const {
    lockType,
    boosterType,
    lockCount,
    setLockType,
    setBoosterType,
    setLockCount,
  } = useInputStore();

  const { setChartData } = useGoldChartStore();

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" /> 설정
        </CardTitle>
        <CardDescription>
          자물쇠 타입, 개수 및 부스터 효과를 설정하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lockType">자물쇠 타입</Label>
          <Select value={lockType} onValueChange={setLockType}>
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
          <Label htmlFor="boosterType">부스터 상자 주기 (7-9)</Label>
          <Select value={boosterType} onValueChange={setBoosterType}>
            <SelectTrigger id="boosterType">
              <SelectValue placeholder="부스터 효과 선택" />
            </SelectTrigger>
            <SelectContent>
              {[7, 8, 9].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lockCount">자물쇠 개수</Label>
          <Input
            id="lockCount"
            type="number"
            min="1"
            value={lockCount}
            onChange={(e) => setLockCount(Number(e.target.value))}
          />
        </div>

        {/* <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="compareMode"
            checked={compareMode}
            onCheckedChange={setCompareMode}
          />
          <Label htmlFor="compareMode">자물쇠 타입 비교 모드</Label>
        </div> */}

        <div className="pt-4">
          <Button
            onClick={() => {
              setChartData(lockCount, lockType, lockCount, Number(boosterType));
            }}
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" /> 계산하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputForm;
