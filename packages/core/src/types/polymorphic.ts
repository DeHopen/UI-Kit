import type React from 'react'

type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>

type AsProp<T extends React.ElementType> = {
  as?: T
}

type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref']

export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = object,
> = AsProp<T> & Props & Omit<PropsOf<T>, keyof (AsProp<T> & Props)>

export type PolymorphicComponentPropsWithRef<
  T extends React.ElementType,
  Props = object,
> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> }

export type PolymorphicComponent<DefaultElement extends React.ElementType, Props = object> = <
  T extends React.ElementType = DefaultElement,
>(
  props: PolymorphicComponentPropsWithRef<T, Props>,
) => React.ReactNode
